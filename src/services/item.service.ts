import { CategoryService } from './category.service';
import { HttpError } from './../common/errors/http-error';
import { injectable, inject } from 'inversify';
import { FastifyInstance } from 'fastify';
import { TYPES } from '../types/ioc-types';

type Item = {
  id: number;
  name?: string;
  size?: number;
  price?: number;
  categoryId?: number;
};

@injectable()
export class ItemService {
  private _categoryService: CategoryService;

  public constructor(
    @inject(TYPES.CategoryService) categoryService: CategoryService
  ) {
    this._categoryService = categoryService;
  }

  public async getAll(fastify: FastifyInstance) {
    return await fastify.prisma.item.findMany();
  }

  public async getItem(fastify: FastifyInstance, id: number) {
    const item = await fastify.prisma.item.findUnique({
      where: { id },
    });

    if (!item) throw new HttpError(404, 'Category not found!');

    return item;
  }

  public async updateItem(fastify: FastifyInstance, item: Item) {
    const { id, ...toUpdate } = item;

    await this.getItem(fastify, id);

    if (toUpdate.categoryId) {
      await this._categoryService.getCategory(fastify, toUpdate.categoryId);
    }

    return await fastify.prisma.item.update({
      where: {
        id,
      },
      data: {
        ...toUpdate,
      },
    });
  }
}
