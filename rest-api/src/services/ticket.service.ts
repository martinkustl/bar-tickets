import { HttpError } from '../common/errors/http-error';
import { injectable } from 'inversify';
import { FastifyInstance } from 'fastify';

type FilterTickets = {
  isPaid?: boolean;
};

type CreateTicket = {
  name: string;
};

type UpdateTicket = {
  id: number;
  name?: string;
  isPaid?: boolean;
  totalCost?: number;
  orderedItems?: number[];
};

@injectable()
class TicketService {
  public async selectAll(fastify: FastifyInstance, filter: FilterTickets) {
    return await fastify.prisma.ticket.findMany({
      where: {
        ...filter,
      },
    });
  }

  public async selectOne(fastify: FastifyInstance, id: number) {
    const ticket = await fastify.prisma.ticket.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });

    if (!ticket) throw new HttpError(404, 'Ticket not found!');

    return ticket;
  }

  public async create(fastify: FastifyInstance, ticket: CreateTicket) {
    return await fastify.prisma.ticket.create({
      data: {
        ...ticket,
      },
    });
  }

  public async update(fastify: FastifyInstance, ticket: UpdateTicket) {
    const { id, isPaid, totalCost, orderedItems } = ticket;

    await this.selectOne(fastify, id);

    const items: { connect?: { id: number }[] } = {};

    if (orderedItems) {
      items.connect = [...orderedItems.map((id) => ({ id }))];
    }

    return await fastify.prisma.ticket.update({
      where: {
        id,
      },
      data: {
        isPaid,
        totalCost,
        items,
      },
    });
  }

  public async delete(fastify: FastifyInstance, id: number) {
    const toDelete = await this.selectOne(fastify, id);

    if (toDelete.isPaid) {
      throw new HttpError(400, 'Paid ticket cannot be deleted!');
    }

    return await fastify.prisma.ticket.delete({
      where: {
        id,
      },
    });
  }
}

export default TicketService;
