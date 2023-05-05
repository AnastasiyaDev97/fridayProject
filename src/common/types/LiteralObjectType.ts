export type LiteralObjectType<T> = T extends { [key: string]: infer U } ? U : never;
