import { ItemService } from './../services/item.service';
import { FastifyPluginAsync } from 'fastify';
import { injectable, inject } from 'inversify';
import * as yup from 'yup';
import { TYPES } from '../types/ioc-types';

const getItemSchema = {
  params: yup.object().shape({ id: yup.number().required() }),
};

const patchItemSchema = {
  params: yup.object().shape({
    id: yup.number().required(),
  }),
  body: yup.object().shape({
    name: yup.string(),
    size: yup.number(),
    price: yup.number(),
    categoryId: yup.number(),
  }),
};

@injectable()
class ItemRoutes {
  private _itemService: ItemService;

  public constructor(@inject(TYPES.ItemService) itemService: ItemService) {
    this._itemService = itemService;
  }

  public init: FastifyPluginAsync = async (fastify, opts) => {
    this.getItems(fastify, opts);
    this.getItem(fastify, opts);
    this.patchItem(fastify, opts);
  };

  private getItems: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', async (req, reply) => {
      const items = await this._itemService.getAll(fastify);
      return reply.code(200).send(items);
    });
  };

  private getItem: FastifyPluginAsync = async (fastify) => {
    fastify.get(
      '/:id',
      {
        schema: getItemSchema,
      },
      async (req, reply) => {
        const { id } = req.params as { id: number };
        const item = await this._itemService.getItem(fastify, id);
        return reply.code(200).send(item);
      }
    );
  };

  private patchItem: FastifyPluginAsync = async (fastify) => {
    fastify.patch('/:id', { schema: patchItemSchema }, async (req, reply) => {
      const { id } = req.params as { id: number };
      const updatedItem = await this._itemService.updateItem(fastify, {
        id,
        ...(req.body as any),
      });
      return reply.code(200).send(updatedItem);
    });
  };
}

export default ItemRoutes;
