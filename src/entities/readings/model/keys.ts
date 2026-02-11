export const readingsKeys = {
  all: ["readings"] as const,
  list: (page: number, limit: number) =>
    [...readingsKeys.all, page, limit] as const,
};
