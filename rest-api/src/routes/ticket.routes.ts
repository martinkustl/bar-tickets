import { FastifyPluginAsync } from 'fastify';
import { injectable, inject } from 'inversify';
import TicketService from '../services/ticket.service';
import { TYPES } from '../types/ioc-types';
import { Routes } from './types';
import * as yup from 'yup';

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
  }),
};

type PatchTicket = {
  Params: yup.InferType<typeof patchTicketSchema.params>;
  Body: yup.InferType<typeof patchTicketSchema.body>;
};

const deleteTicketSchema = {
  params: yup.object().shape({
    id: yup.number().required(),
  }),
  querystring: yup.object().shape({
    affectOrders: yup.boolean(),
  }),
};

type DeleteTicket = {
  Params: yup.InferType<typeof deleteTicketSchema.params>;
  Querystring: yup.InferType<typeof deleteTicketSchema.querystring>;
};

const postItemToTicketSchema = {
  params: yup.object().shape({
    ticketId: yup.number().required(),
    itemId: yup.number().required(),
  }),
};

type PostItemToTicket = {
  Params: yup.InferType<typeof postItemToTicketSchema.params>;
};

const deleteItemToTicketSchema = {
  params: yup.object().shape({
    ticketId: yup.number().required(),
    itemId: yup.number().required(),
  }),
};

type DeleteItemToTicket = {
  Params: yup.InferType<typeof postItemToTicketSchema.params>;
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
    this.postItemToTicket(fastify, opts);
    this.deleteItemToTicket(fastify, opts);
  };

  protected getAll: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', async (req, reply) => {
      const tickets = await this._ticketService.selectAll(fastify);
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
        const updatedTicket = await this._ticketService.update(fastify, {
          id,
          ...req.body,
        });
        return reply.code(200).send(updatedTicket);
      }
    );
  };

  protected deleteOne: FastifyPluginAsync = async (fastify) => {
    fastify.delete<DeleteTicket>(
      '/:id',
      { schema: deleteTicketSchema },
      async (req, reply) => {
        const { id } = req.params;
        const { affectOrders } = req.query;
        if (affectOrders) {
          const deletedTicket = await this._ticketService.deleteWithOrders(
            fastify,
            id
          );
          return reply.code(200).send(deletedTicket);
        } else {
          const deletedTicket = await this._ticketService.delete(fastify, id);
          return reply.code(200).send(deletedTicket);
        }
      }
    );
  };

  protected postItemToTicket: FastifyPluginAsync = async (fastify) => {
    fastify.post<PostItemToTicket>(
      '/:ticketId/:itemId',
      { schema: postItemToTicketSchema },
      async (req, reply) => {
        const { ticketId, itemId } = req.params;
        const addedItem = await this._ticketService.addItemToTicket(
          fastify,
          ticketId,
          itemId
        );
        return reply.code(200).send(addedItem);
      }
    );
  };

  protected deleteItemToTicket: FastifyPluginAsync = async (fastify) => {
    fastify.delete<DeleteItemToTicket>(
      '/:ticketId/:itemId',
      { schema: deleteItemToTicketSchema },
      async (req, reply) => {
        const { ticketId, itemId } = req.params;
        const deletedItem = await this._ticketService.deleteItemToTicket(
          fastify,
          ticketId,
          itemId
        );
        return reply.code(200).send(deletedItem);
      }
    );
  };
}

export default TicketRoutes;
