import { ItemSum, ItemWithCategory } from '@/types';

export const isItemSum = (item: ItemWithCategory | ItemSum): item is ItemSum =>
  'sum' in item;
