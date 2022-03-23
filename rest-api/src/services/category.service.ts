import { HttpError } from '../common/errors/http-error';
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
  public async selectAll(fastify: FastifyInstance) {
    return await fastify.prisma.category.findMany();
  }

  public async selectOne(fastify: FastifyInstance, id: number) {
    const category = await fastify.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new HttpError(404, 'Category not found!');

    return category;
  }

  public async update(fastify: FastifyInstance, category: UpdateCategory) {
    const { id, name } = category;
    await this.selectOne(fastify, id);

    return await fastify.prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  public async delete(fastify: FastifyInstance, id: number) {
    await this.selectOne(fastify, id);

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
        422,
        'Category with connected items cannot be deleted!'
      );

    return await fastify.prisma.category.delete({
      where: {
        id,
      },
    });
  }

  public async create(fastify: FastifyInstance, { name }: CreateCategory) {
    return await fastify.prisma.category.create({
      data: {
        name,
      },
    });
  }
}

export default CategoryService;
