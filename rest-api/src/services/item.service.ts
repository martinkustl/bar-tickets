import CategoryService from './category.service';
import { HttpError } from '../common/errors';
import { injectable, inject } from 'inversify';
import { FastifyInstance } from 'fastify';
import { TYPES } from '../types/ioc-types';

type UpdateItem = {
  id: number;
  name?: string;
  size?: number;
  price?: number;
  categoryId?: number;
};

type CreateItem = {
  name: string;
  size: number;
  price: number;
  categoryId: number;
};

@injectable()
class ItemService {
  private _categoryService: CategoryService;

  public constructor(
    @inject(TYPES.CategoryService) categoryService: CategoryService
  ) {
    this._categoryService = categoryService;
  }

  public async selectAll(
    fastify: FastifyInstance,
    { includeCategory = false }: { includeCategory?: boolean }
  ) {
    let query;

    if (includeCategory) {
      query = {
        include: {
          category: true,
        },
      };
    }

    return await fastify.prisma.item.findMany(query);
  }

  public async selectOne(fastify: FastifyInstance, id: number) {
    const item = await fastify.prisma.item.findUnique({
      where: { id },
    });

    if (!item) throw new HttpError(404, 'Item not found!');

    return item;
  }

  public async update(fastify: FastifyInstance, item: UpdateItem) {
    const { id, ...toUpdate } = item;

    await this.selectOne(fastify, id);

    if (toUpdate.categoryId) {
      await this._categoryService.selectOne(fastify, toUpdate.categoryId);
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

  public async delete(fastify: FastifyInstance, id: number) {
    await this.selectOne(fastify, id);

    return await fastify.prisma.item.delete({
      where: {
        id,
      },
    });
  }

  public async create(fastify: FastifyInstance, item: CreateItem) {
    return await fastify.prisma.item.create({
      data: {
        ...item,
      },
    });
  }
}

export default ItemService;
