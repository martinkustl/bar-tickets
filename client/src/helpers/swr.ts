import { KeyedMutator } from 'swr';
import { AnyAppRecord } from '@/types';

type SwrHelperFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  mutate: KeyedMutator<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  data?: AnyAppRecord[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
) => (record: AnyAppRecord) => Promise<void>;

export const editRecord: SwrHelperFunction =
  (mutate, data?) => async (updatedRecord: AnyAppRecord) => {
    if (!data) return;
    const updatedData = data.map((item) => {
      if (item.id === updatedRecord.id) return updatedRecord;
      return item;
    });
    await mutate([...updatedData], { revalidate: false });
  };

export const deleteRecord: SwrHelperFunction =
  (mutate, data?) => async (deletedRecord: AnyAppRecord) => {
    if (!data) return;
    const filteredData = data.filter((item) => item.id !== deletedRecord.id);
    await mutate(filteredData, { revalidate: false });
  };

export const addRecord: SwrHelperFunction =
  (mutate, data?) => async (newRecord: AnyAppRecord) => {
    if (!data) return;
    await mutate([...data, newRecord], { revalidate: false });
  };
