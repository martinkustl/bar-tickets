import { HttpError } from './../common/errors/http-error';
import {
  FastifyPluginAsync,
  FastifyInstance,
  FastifyLoggerInstance,
} from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { injectable } from 'inversify';

// const itemRoutes: FastifyPluginAsync = async (fastify) => {
//   fastify.get('/', async (req, reply) => {
//     return reply.code(200).send('Hello world from Items!');
//   });
// };

// export default itemRoutes;

// interface Test {
//     initRoutes: FastifyPluginAsync
// }
@injectable()
class ItemRoutes {
  public init: FastifyPluginAsync = async (fastify, opts) => {
    this.getItems(fastify, opts);
  };

  private getItems: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', async (req, reply) => {
      return reply.code(200).send('Hello world from Items!');
    });
  };

  //   public async initRoutes(
  //     fastify: FastifyInstance<
  //       Server,
  //       IncomingMessage,
  //       ServerResponse,
  //       FastifyLoggerInstance
  //     >
  //   ) {
  //     fastify.get('/', async (req, reply) => {
  //       return reply.code(200).send('Hello world from Items!');
  //     });
  //   }
}

export default ItemRoutes;

// import { injectable } from 'inversify';

// @injectable()
// export class ItemService {
//   public getAll() {
//     return 'gets all items';
//   }
// }
