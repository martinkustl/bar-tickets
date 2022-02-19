import { FastifyPluginAsync } from 'fastify';
import { injectable } from 'inversify';
import * as yup from 'yup';

const getItemSchema = {
  params: yup.object().shape({ id: yup.number().required() }),
};

@injectable()
class ItemRoutes {
  public init: FastifyPluginAsync = async (fastify, opts) => {
    this.getItems(fastify, opts);
    this.getItem(fastify, opts);
  };

  private getItems: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', async (req, reply) => {
      return reply.code(200).send('Hello world from Items!');
    });
  };

  private getItem: FastifyPluginAsync = async (fastify) => {
    fastify.get(
      '/:id',
      {
        schema: getItemSchema,
      },
      async (req, reply) => {
        return reply.code(200).send('Hello world from one item!');
      }
    );
  };
}

export default ItemRoutes;
