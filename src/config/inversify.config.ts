import { ItemService } from './../services/item.service';
import { Container } from 'inversify';
import { TYPES } from '../types/ioc-types';
import ItemRoutes from '../routes/item';

const container = new Container();

// Routes
container.bind<ItemRoutes>(TYPES.ItemRoutes).to(ItemRoutes);

// Services
container.bind<ItemService>(TYPES.ItemService).to(ItemService);

export { container };
