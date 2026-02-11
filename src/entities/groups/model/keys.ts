export const groupsKeys = {
  all: ["groups"] as const,
  list: (page: number, limit: number) =>
    [...groupsKeys.all, page, limit] as const,
  filter: () => [...groupsKeys.all, "all-for-filter"] as const,
};
