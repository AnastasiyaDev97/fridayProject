export const CARD_TABLE_FIELDS = [
  { title: 'Question', value: 'question' },
  { title: 'Answer', value: 'answer' },
  { title: 'Last updated', value: 'updated' },
  { title: 'Grade', value: 'grade' },
] as const;
export const PACK_TABLE_FIELDS = [
  { title: 'Name', value: 'name' },
  { title: 'Count', value: 'cardsCount' },
  { title: 'Last updated', value: 'updated' },
  { title: 'Created by', value: 'user_name' },
] as const;

export type TableFieldstype = typeof CARD_TABLE_FIELDS | typeof PACK_TABLE_FIELDS;

export const PAGE_COUNT = 7;

const PackFieldsValues = PACK_TABLE_FIELDS.map(({ value }) => {
  return value;
});

export type PackFieldsValuesType = (typeof PackFieldsValues)[number];

const CardFieldsValues = CARD_TABLE_FIELDS.map(({ value }) => {
  return value;
});

export type CardFieldsValuesType = (typeof CardFieldsValues)[number];
