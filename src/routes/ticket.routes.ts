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

const postTicketSchema = {
  body: yup.object().shape({
    name: yup.string().required(),
  }),
};

type PostTicket = {
  Body: yup.InferType<typeof postTicketSchema.body>;
};

const patchTicketSchema = {
  params: yup.object().shape({ id: yup.number().required() }),
  body: yup.object().shape({
    name: yup.string(),
    isPaid: yup.boolean(),
    totalCost: yup.number(),
    orderedItems: yup.array().of(yup.number().required()),
  }),
};

type PatchTicket = {
  Params: yup.InferType<typeof patchTicketSchema.params>;
  Body: yup.InferType<typeof patchTicketSchema.body>;
};

// jerseys: yup
// .array()
// .of(
//   yup.object({
//     number: yup.string().nullable(),
//     name: yup.string().nullable(),
//     size: yup.string().required(),
//     type: yup.string().nullable(),
//     price: yup.number().required(),
//     colorId: yup.number().nullable(),
//   })
// )

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
      const tickets = await this._ticketService.selectAll(fastify, {
        isPaid: req.query.isPaid,
      });
      return reply.code(200).send(tickets);
    });
  };

  protected getOne: FastifyPluginAsync = async (fastify) => {
    fastify.get<GetTicket>(
      '/:id',
      { schema: getTicketSchema },
      async (req, reply) => {
        const { id } = req.params;

        const ticket = await this._ticketService.selectOne(fastify, id);
        return reply.code(200).send(ticket);
      }
    );
  };

  protected postOne: FastifyPluginAsync = async (fastify) => {
    fastify.post<PostTicket>('/', async (req, reply) => {
      const newTicket = await this._ticketService.create(fastify, {
        name: req.body.name,
      });
      return reply.code(200).send(newTicket);
    });
  };

  protected patchOne: FastifyPluginAsync = async (fastify) => {
    fastify.patch<PatchTicket>(
      '/:id',
      { schema: patchTicketSchema },
      async (req, reply) => {
        const { id } = req.params;
        const updatedItem = await this._ticketService.update(fastify, {
          id,
          ...req.body,
        });
        return reply.code(200).send(updatedItem);
      }
    );
  };

  protected deleteOne: FastifyPluginAsync = async (fastify) => {};
}

export default TicketRoutes;
