import { injectable } from 'inversify';

@injectable()
export class ItemService {
  public getAll() {
    return 'gets all items';
  }
}
