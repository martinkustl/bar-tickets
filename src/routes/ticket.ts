import { FastifyPluginAsync } from 'fastify';

const ticketRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (req, reply) => {
    try {
      return reply.code(200).send('Hello world from Tickets!');
    } catch (err) {
      req.log.error(err);
    }
  });
};

export default ticketRoutes;
