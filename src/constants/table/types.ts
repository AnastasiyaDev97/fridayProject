import { CARD_TABLE_FIELDS, PACK_TABLE_FIELDS } from '.';

const PackFieldsValues = PACK_TABLE_FIELDS.map(({ value }) => {
  return value;
});

const CardFieldsValues = CARD_TABLE_FIELDS.map(({ value }) => {
  return value;
});

export type TableFieldstype = typeof CARD_TABLE_FIELDS | typeof PACK_TABLE_FIELDS;
export type PackFieldsValuesType = typeof PackFieldsValues[number];
export type CardFieldsValuesType = typeof CardFieldsValues[number];
