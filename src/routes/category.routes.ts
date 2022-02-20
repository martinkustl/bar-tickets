import { injectable, inject } from 'inversify';
import { FastifyPluginAsync } from 'fastify';
import * as yup from 'yup';
import { TYPES } from '../types/ioc-types';
import { Routes } from './types';
import { CategoryService } from '../services/category.service';

const getCategorySchema = {
  params: yup.object().shape({ id: yup.number().required() }),
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

  public init: FastifyPluginAsync = async (fastify, opts) => {};
  protected getAll: FastifyPluginAsync = async (fastify) => {};
  protected getOne: FastifyPluginAsync = async (fastify) => {};
  protected patchOne: FastifyPluginAsync = async (fastify) => {};
  protected postOne: FastifyPluginAsync = async (fastify) => {};
  protected deleteOne: FastifyPluginAsync = async (fastify) => {};
}

export default CategoryRoutes;
