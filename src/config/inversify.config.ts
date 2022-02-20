import { CategoryService } from './../services/category.service';
import { ItemService } from './../services/item.service';
import { Container } from 'inversify';
import { TYPES } from '../types/ioc-types';
import ItemRoutes from '../routes/item.routes';

const container = new Container();

// Routes
container.bind<ItemRoutes>(TYPES.ItemRoutes).to(ItemRoutes);

// Services
container.bind<ItemService>(TYPES.ItemService).to(ItemService);
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryService);

export { container };
