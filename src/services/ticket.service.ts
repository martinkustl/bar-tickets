import { injectable } from 'inversify';
import { FastifyInstance } from 'fastify';

type FilterTickets = {
  isPaid?: boolean;
};

@injectable()
class TicketService {
  public async getAll(fastify: FastifyInstance, filter: FilterTickets) {
    return await fastify.prisma.ticket.findMany({
      where: {
        ...filter,
      },
    });
  }

  public async getTicket(fastify: FastifyInstance, id: number) {
    return await fastify.prisma.ticket.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });
  }
}

export default TicketService;
