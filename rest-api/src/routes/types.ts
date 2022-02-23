import { FastifyPluginAsync } from 'fastify';
import { injectable } from 'inversify';

@injectable()
export abstract class Routes {
  public abstract init: FastifyPluginAsync;
  protected abstract getAll: FastifyPluginAsync;
  protected abstract getOne: FastifyPluginAsync;
  protected abstract patchOne: FastifyPluginAsync;
  protected abstract deleteOne: FastifyPluginAsync;
  protected abstract postOne: FastifyPluginAsync;
}

export interface IRoutes {
  init: FastifyPluginAsync;
  getAll: FastifyPluginAsync;
  getOne: FastifyPluginAsync;
  patchOne: FastifyPluginAsync;
  deleteOne: FastifyPluginAsync;
  postOne: FastifyPluginAsync;
}
