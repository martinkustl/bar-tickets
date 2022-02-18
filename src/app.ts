import { HttpError } from './common/errors/http-error';
import fastify, { FastifyInstance } from 'fastify';
import prismaPlugin from './plugins/prisma';
import ItemRoutes from './routes/item';
import { TYPES } from './types/ioc-types';
import { container } from './config/inversify.config';

class App {
  public app: FastifyInstance;
  private _itemRoutes = container.get<ItemRoutes>(TYPES.ItemRoutes);

  public constructor(public opts = {}) {
    this.app = fastify(opts);
    this.setCustomErrorHandling();
    this.registerRoutes();
  }

  private setCustomErrorHandling() {
    this.app.setErrorHandler((err, req, reply) => {
      req.log.error(err);

      if (err instanceof HttpError) {
        reply.status(err.statusCode).send(`HttpError: ${err.message}`);
      } else {
        reply.status(500).send('Unknown error!');
      }
    });
  }

  private registerRoutes() {
    this.app.register(prismaPlugin);
    this.app.register(this._itemRoutes.init, {
      prefix: '/items',
    });
    this.app.register(require('./routes/ticket'), { prefix: '/tickets' });
  }
}

export default App;
