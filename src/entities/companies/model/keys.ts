export const companiesKeys = {
  all: ["companies"] as const,
  list: (isArchived: boolean) =>
    [...companiesKeys.all, isArchived] as const,
};
