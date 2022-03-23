import { FastifyPluginAsync } from 'fastify';
import { injectable, inject } from 'inversify';
import { Routes } from './types';
import ItemService from '../services/item.service';
import * as yup from 'yup';
import { TYPES } from '../types/ioc-types';
import { HttpError } from '../common/errors';

const getAllItemsSchema = {
  querystring: yup.object().shape({ includeCategory: yup.boolean() }),
};

type GetAllItems = {
  Querystring: yup.InferType<typeof getAllItemsSchema.querystring>;
};

const getItemSchema = {
  params: yup.object().shape({ id: yup.number().required() }),
};

type GetItem = {
  Params: yup.InferType<typeof getItemSchema.params>;
};

const postItemSchema = {
  body: yup.object().shape({
    name: yup.string().required(),
    size: yup.number().required(),
    price: yup.number().required(),
    categoryId: yup.number().required(),
  }),
};

type PostItem = {
  Body: yup.InferType<typeof postItemSchema.body>;
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

type PatchItem = {
  Params: yup.InferType<typeof patchItemSchema.params>;
  Body: yup.InferType<typeof patchItemSchema.body>;
};

const deleteItemSchema = {
  params: yup.object().shape({
    id: yup.number().required(),
  }),
};

type DeleteItem = { Params: yup.InferType<typeof deleteItemSchema.params> };

@injectable()
class ItemRoutes extends Routes {
  private _itemService: ItemService;

  public constructor(@inject(TYPES.ItemService) itemService: ItemService) {
    super();
    this._itemService = itemService;
  }

  public init: FastifyPluginAsync = async (fastify, opts) => {
    this.getAll(fastify, opts);
    this.getOne(fastify, opts);
    this.postOne(fastify, opts);
    this.patchOne(fastify, opts);
    this.deleteOne(fastify, opts);
  };

  protected getAll: FastifyPluginAsync = async (fastify) => {
    fastify.get<GetAllItems>(
      '/',
      {
        schema: getAllItemsSchema,
      },
      async (req, reply) => {
        const { includeCategory } = req.query;
        const items = await this._itemService.selectAll(fastify, {
          includeCategory,
        });
        return reply.code(200).send(items);
      }
    );
  };

  protected getOne: FastifyPluginAsync = async (fastify) => {
    fastify.get<GetItem>(
      '/:id',
      {
        schema: getItemSchema,
      },
      async (req, reply) => {
        const { id } = req.params;
        const item = await this._itemService.selectOne(fastify, id);
        return reply.code(200).send(item);
      }
    );
  };

  protected postOne: FastifyPluginAsync = async (fastify) => {
    fastify.post<PostItem>(
      '/',
      { schema: postItemSchema },
      async (req, reply) => {
        const newItem = await this._itemService.create(fastify, {
          ...req.body,
        });
        return reply.code(200).send(newItem);
      }
    );
  };

  protected patchOne: FastifyPluginAsync = async (fastify) => {
    fastify.patch<PatchItem>(
      '/:id',
      { schema: patchItemSchema },
      async (req, reply) => {
        const { id } = req.params;
        const updatedItem = await this._itemService.update(fastify, {
          id,
          ...req.body,
        });
        return reply.code(200).send(updatedItem);
      }
    );
  };

  protected deleteOne: FastifyPluginAsync = async (fastify) => {
    fastify.delete<DeleteItem>(
      '/:id',
      { schema: deleteItemSchema },
      async (req, reply) => {
        const { id } = req.params;

        const orderedItem = await fastify.prisma.ticketsOnItems.findFirst({
          where: {
            itemId: id,
          },
        });

        if (orderedItem)
          throw new HttpError(
            422,
            'Item is ordered in some Ticket, so it cannot be deleted!'
          );

        const deletedItem = await this._itemService.delete(fastify, id);
        return reply.code(200).send(deletedItem);
      }
    );
  };
}

export default ItemRoutes;
