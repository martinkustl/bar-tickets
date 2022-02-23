import CategoryService from '../services/category.service';
import ItemService from '../services/item.service';
import { Container } from 'inversify';
import { TYPES } from '../types/ioc-types';
import ItemRoutes from '../routes/item.routes';
import CategoryRoutes from '../routes/category.routes';
import TicketRoutes from '../routes/ticket.routes';
import TicketService from '../services/ticket.service';

const container = new Container();

// Routes
container.bind<ItemRoutes>(TYPES.ItemRoutes).to(ItemRoutes);
container.bind<CategoryRoutes>(TYPES.CategoryRoutes).to(CategoryRoutes);
container.bind<TicketRoutes>(TYPES.TicketRoutes).to(TicketRoutes);

// Services
container.bind<ItemService>(TYPES.ItemService).to(ItemService);
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryService);
container.bind<TicketService>(TYPES.TicketService).to(TicketService);

export { container };
