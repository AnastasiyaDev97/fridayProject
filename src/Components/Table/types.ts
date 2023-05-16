import { ReactElement } from 'react';

import { EntityType } from 'common/types';
import {
  CardFieldsValuesType,
  PackFieldsValuesType,
  TableFieldstype,
} from 'constants/table';

export type SortingDirecionType = '0' | '1';

export type CommonFieldsValuesType = PackFieldsValuesType | CardFieldsValuesType;

export type PackRowValues = {
  name?: string;
  cardsCount?: number;
  updated: string;
  user_name?: string;
};

export type CardRowValues = {
  question?: string;
  answer?: string;
  updated: string;
  rating?: ReactElement;
};

export type ItemValues = {
  userId: string;
  cardsPackId?: string;
  id: string;
  tableValues: CardRowValues & PackRowValues;
};

export type TablePropsType = {
  itemName: EntityType;
  tableTitles: TableFieldstype;
  tableItems?: ItemValues[];
};
