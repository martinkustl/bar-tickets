import { HttpError } from './../common/errors/http-error';
import { injectable } from 'inversify';
import { FastifyInstance } from 'fastify';

type UpdateCategory = {
  id: number;
  name: string;
};

type CreateCategory = {
  name: string;
};

@injectable()
class CategoryService {
  public async getAll(fastify: FastifyInstance) {
    return await fastify.prisma.category.findMany();
  }

  public async getCategory(fastify: FastifyInstance, id: number) {
    const category = await fastify.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new HttpError(404, 'Category not found!');

    return category;
  }

  public async updateCategory(
    fastify: FastifyInstance,
    category: UpdateCategory
  ) {
    const { id, name } = category;
    await this.getCategory(fastify, id);

    return await fastify.prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  public async deleteCategory(fastify: FastifyInstance, id: number) {
    await this.getCategory(fastify, id);

    const noOfCategores = await fastify.prisma.item.aggregate({
      _count: {
        id: true,
      },
      where: {
        categoryId: id,
      },
    });

    if (noOfCategores._count.id > 0)
      throw new HttpError(
        400,
        'Category with connected items cannot be deleted!'
      );

    return await fastify.prisma.category.delete({
      where: {
        id,
      },
    });
  }

  public async createCategory(
    fastify: FastifyInstance,
    { name }: CreateCategory
  ) {
    return await fastify.prisma.category.create({
      data: {
        name,
      },
    });
  }
}

export default CategoryService;
