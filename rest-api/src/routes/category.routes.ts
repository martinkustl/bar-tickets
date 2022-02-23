import { injectable, inject } from 'inversify';
import { FastifyPluginAsync } from 'fastify';
import * as yup from 'yup';
import { TYPES } from '../types/ioc-types';
import { Routes } from './types';
import CategoryService from '../services/category.service';

const getCategorySchema = {
  params: yup.object().shape({ id: yup.number().required() }),
};

type GetCategory = {
  Params: yup.InferType<typeof getCategorySchema.params>;
};

const postCategorySchema = {
  body: yup.object().shape({
    name: yup.string().required(),
  }),
};

type PostCategory = {
  Body: yup.InferType<typeof postCategorySchema.body>;
};

const patchCategorySchema = {
  params: yup.object().shape({
    id: yup.number().required(),
  }),
  body: yup.object().shape({
    name: yup.string().required(),
  }),
};

type PatchCategory = {
  Params: yup.InferType<typeof patchCategorySchema.params>;
  Body: yup.InferType<typeof patchCategorySchema.body>;
};

const deleteCategorySchema = {
  params: yup.object().shape({
    id: yup.number().required(),
  }),
};

type DeleteCategory = {
  Params: yup.InferType<typeof deleteCategorySchema.params>;
};

@injectable()
class CategoryRoutes extends Routes {
  private _categoriesService: CategoryService;

  public constructor(
    @inject(TYPES.CategoryService) categoryService: CategoryService
  ) {
    super();
    this._categoriesService = categoryService;
  }

  public init: FastifyPluginAsync = async (fastify, opts) => {
    this.getAll(fastify, opts);
    this.getOne(fastify, opts);
    this.patchOne(fastify, opts);
    this.postOne(fastify, opts);
    this.deleteOne(fastify, opts);
  };

  protected getAll: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', async (_, reply) => {
      const categories = await this._categoriesService.selectAll(fastify);
      return reply.code(200).send(categories);
    });
  };

  protected getOne: FastifyPluginAsync = async (fastify) => {
    fastify.get<GetCategory>(
      '/:id',
      {
        schema: getCategorySchema,
      },
      async (req, reply) => {
        const { id } = req.params;
        const category = await this._categoriesService.selectOne(fastify, id);
        return reply.code(200).send(category);
      }
    );
  };

  protected postOne: FastifyPluginAsync = async (fastify) => {
    fastify.post<PostCategory>(
      '/',
      { schema: postCategorySchema },
      async (req, reply) => {
        const newCategory = await this._categoriesService.create(fastify, {
          ...req.body,
        });
        return reply.code(200).send(newCategory);
      }
    );
  };

  protected patchOne: FastifyPluginAsync = async (fastify) => {
    fastify.patch<PatchCategory>(
      '/:id',
      { schema: patchCategorySchema },
      async (req, reply) => {
        const updatedCategory = await this._categoriesService.update(fastify, {
          id: req.params.id,
          name: req.body.name,
        });

        return reply.code(200).send(updatedCategory);
      }
    );
  };

  protected deleteOne: FastifyPluginAsync = async (fastify) => {
    fastify.delete<DeleteCategory>(
      '/:id',
      { schema: deleteCategorySchema },
      async (req, reply) => {
        const { id } = req.params;
        const deletedItem = await this._categoriesService.delete(fastify, id);
        return reply.code(200).send(deletedItem);
      }
    );
  };
}

export default CategoryRoutes;
