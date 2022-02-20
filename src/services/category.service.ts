import { HttpError } from './../common/errors/http-error';
import { injectable } from 'inversify';
import { FastifyInstance } from 'fastify';

@injectable()
export class CategoryService {
  public async getCategory(fastify: FastifyInstance, id: number) {
    const category = await fastify.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new HttpError(404, 'Category not found!');

    return category;
  }
}
