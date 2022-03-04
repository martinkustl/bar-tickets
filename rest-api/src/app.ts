import { HttpError, ValidationError } from './common/errors';
import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import prismaPlugin from './plugins/prisma';
import ItemRoutes from './routes/item.routes';
import { TYPES } from './types/ioc-types';
import { container } from './config/inversify.config';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import CategoryRoutes from './routes/category.routes';
import TicketRoutes from './routes/ticket.routes';

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
  private _categoryRoutes = container.get<CategoryRoutes>(TYPES.CategoryRoutes);
  private _ticketRoutes = container.get<TicketRoutes>(TYPES.TicketRoutes);

  public constructor(public opts = {}) {
    this.app = fastify(opts);
    this.setErrorHandler();
    this.setValidatorCompiler();
    this.registerRoutes();
    this.enableCors();
  }

  // TODO - add auth via fastify-jwt. See: https://www.npmjs.com/package/fastify-jwt

  private registerRoutes() {
    this.app.register(prismaPlugin);
    this.app.register(this._itemRoutes.init, {
      prefix: '/items',
    });
    this.app.register(this._categoryRoutes.init, { prefix: '/categories' });
    this.app.register(this._ticketRoutes.init, { prefix: '/tickets' });
  }

  private setErrorHandler() {
    this.app.setErrorHandler((err, req, reply) => {
      req.log.error(err);

      if (err instanceof HttpError) {
        reply.status(err.statusCode).send({
          statusCode: err.statusCode,
          message: `HttpError: ${err.message}`,
        });
      } else if (err instanceof ValidationError) {
        reply.status(err.statusCode).send({
          statusCode: err.statusCode,
          message: `ValidationError: ${err.message}`,
        });
      } else {
        reply
          .status(err?.statusCode ?? 500)
          .send({ statusCode: 500, message: 'Unknown error!' });
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

  private enableCors() {
    this.app.register(fastifyCors, {
      origin: (origin, cb) => {
        // console.log(origin);
        // console.log('------------------ssss');
        // const org = origin ?? undefined;
        // const hostname = new URL(org)?.hostname;
        // console.log(hostname);
        // console.log('-------------');
        // if (hostname === 'localhost' || !hostname) {
        //   //  Request from localhost will pass
        //   cb(null, true);
        //   return;
        // }
        cb(null, true);
        return;

        // Generate an error on other origins, disabling access
        cb(new HttpError(422, 'Not allowed'), false);
      },
    });
  }
}

export default App;
