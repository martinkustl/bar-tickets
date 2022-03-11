import { HttpError } from '../common/errors';
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
};

type SelectTicketItemsRawQuery = {
  sum: number;
  itemId: number;
  name: string;
  price: number;
  size: number;
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
    });

    const ticketItems = await fastify.prisma
      .$queryRaw<SelectTicketItemsRawQuery>`SELECT COUNT(TicketsOnItems.id) AS 'sum', Item.id, Item.name, Item.price, Item.size FROM TicketsOnItems
                              JOIN Item
                              ON TicketsOnItems.itemId = Item.id
                              WHERE ticketId = ${id}
                              GROUP BY itemId;
                `;
    if (!ticket) throw new HttpError(404, 'Ticket not found!');

    return { ...ticket, items: ticketItems };
  }

  public async create(fastify: FastifyInstance, ticket: CreateTicket) {
    return await fastify.prisma.ticket.create({
      data: {
        ...ticket,
      },
    });
  }

  public async update(fastify: FastifyInstance, ticket: UpdateTicket) {
    const { id, isPaid, name } = ticket;

    await this.selectOne(fastify, id);

    return await fastify.prisma.ticket.update({
      where: {
        id,
      },
      data: {
        name,
        isPaid,
      },
    });
  }

  public async delete(fastify: FastifyInstance, id: number) {
    const toDelete = await this.selectOne(fastify, id);

    if (toDelete.isPaid) {
      throw new HttpError(400, 'Paid ticket cannot be deleted!');
    }

    const isSomethingOrdered = await fastify.prisma.ticketsOnItems.findFirst({
      where: {
        ticketId: id,
      },
    });

    if (isSomethingOrdered)
      throw new HttpError(400, 'Tickets wit ordered items cannot be deleted!');

    return await fastify.prisma.ticket.delete({
      where: {
        id,
      },
    });
  }

  public async deleteWithOrders(fastify: FastifyInstance, id: number) {
    await fastify.prisma.ticketsOnItems.deleteMany({
      where: {
        ticketId: id,
      },
    });

    return await fastify.prisma.ticket.delete({
      where: {
        id,
      },
    });
  }
  public async addItemToTicket(
    fastify: FastifyInstance,
    ticketId: number,
    itemId: number
  ) {
    await fastify.prisma.ticketsOnItems.create({
      data: { ticketId, itemId },
    });

    return await fastify.prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });
  }

  public async deleteItemToTicket(
    fastify: FastifyInstance,
    ticketId: number,
    itemId: number
  ) {
    const firstRecord = await fastify.prisma.ticketsOnItems.findFirst({
      where: {
        ticketId,
        itemId,
      },
    });

    if (!firstRecord) {
      throw new HttpError(404, 'Item for given ticket not found!');
    }

    return await fastify.prisma.ticketsOnItems.delete({
      where: {
        id: firstRecord.id,
      },
    });
  }
}

export default TicketService;
