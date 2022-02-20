import { FastifyPluginAsync } from 'fastify';
import { injectable, inject } from 'inversify';
import TicketService from '../services/ticket.service';
import { TYPES } from '../types/ioc-types';
import { Routes } from './types';
import * as yup from 'yup';

const getAllTicketsSchema = {
  params: yup.object().shape({ isPaid: yup.boolean() }),
};

type GetAllTickets = {
  Querystring: yup.InferType<typeof getAllTicketsSchema.params>;
};

const getTicketSchema = {
  params: yup.object().shape({ id: yup.number().required() }),
};

type GetTicket = {
  Params: yup.InferType<typeof getTicketSchema.params>;
};

@injectable()
class TicketRoutes extends Routes {
  private _ticketService: TicketService;

  public constructor(
    @inject(TYPES.TicketService) ticketService: TicketService
  ) {
    super();
    this._ticketService = ticketService;
  }

  public init: FastifyPluginAsync = async (fastify, opts) => {
    this.getAll(fastify, opts);
    this.getOne(fastify, opts);
    this.postOne(fastify, opts);
    this.patchOne(fastify, opts);
    this.deleteOne(fastify, opts);
  };

  protected getAll: FastifyPluginAsync = async (fastify) => {
    fastify.get<GetAllTickets>('/', async (req, reply) => {
      const tickets = await this._ticketService.getAll(fastify, {
        isPaid: req.query.isPaid,
      });
      return reply.code(200).send(tickets);
    });
  };

  protected getOne: FastifyPluginAsync = async (fastify) => {
    fastify.get<GetTicket>('/:id', async (req, reply) => {
      const ticket = await this._ticketService.getTicket(
        fastify,
        req.params.id
      );
      return reply.code(200).send(ticket);
    });
  };
  protected postOne: FastifyPluginAsync = async (fastify) => {};
  protected patchOne: FastifyPluginAsync = async (fastify) => {};
  protected deleteOne: FastifyPluginAsync = async (fastify) => {};
}

export default TicketRoutes;
