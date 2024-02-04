import { Children, ReactNode } from 'react';

type Props<T> = {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
};

export const MappingList = <T extends any>({ renderItem, data }: Props<T>) =>
  Children.toArray(data.map((item, index) => renderItem(item, index)));
