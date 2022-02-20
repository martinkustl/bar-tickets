import { HttpError, ValidationError } from './common/errors';
import fastify, { FastifyInstance } from 'fastify';
import prismaPlugin from './plugins/prisma';
import ItemRoutes from './routes/item.routes';
import { TYPES } from './types/ioc-types';
import { container } from './config/inversify.config';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

export type YupOptions = typeof yupDefaultOptions;

const yupDefaultOptions = {
  strict: false,
  abortEarly: false,
  stripUnknown: true,
  recursive: true,
};

class App {
  public app: FastifyInstance;
  private _itemRoutes = container.get<ItemRoutes>(TYPES.ItemRoutes);

  public constructor(public opts = {}) {
    this.app = fastify(opts);
    this.setErrorHandler();
    this.setValidatorCompiler();
    this.registerRoutes();
  }

  // TODO - add auth via fastify-jwt. See: https://www.npmjs.com/package/fastify-jwt

  private registerRoutes() {
    this.app.register(prismaPlugin);
    this.app.register(this._itemRoutes.init, {
      prefix: '/items',
    });
    this.app.register(require('./routes/ticket'), { prefix: '/tickets' });
  }

  private setErrorHandler() {
    this.app.setErrorHandler((err, req, reply) => {
      req.log.error(err);

      if (err instanceof HttpError) {
        reply.status(err.statusCode).send(`HttpError: ${err.message}`);
      } else if (err instanceof ValidationError) {
        reply.status(err.statusCode).send(`ValidationError: ${err.message}`);
      } else {
        reply.status(err?.statusCode ?? 500).send('Unknown error!');
      }
    });
  }

  private setValidatorCompiler() {
    this.app.setValidatorCompiler<OptionalObjectSchema<ObjectShape>>(
      ({ schema }): any => {
        return (data: any) => {
          try {
            const result = schema.validateSync(data, {
              strict: false,
              abortEarly: false,
              stripUnknown: true,
              recursive: true,
            });
            return { value: result };
          } catch (err: any) {
            throw new ValidationError(err.errors.toString());
          }
        };
      }
    );
  }
}

export default App;
