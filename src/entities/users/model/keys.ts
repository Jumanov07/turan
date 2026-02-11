export const usersKeys = {
  all: ["users"] as const,
  list: (page: number, limit: number, isArchived: boolean) =>
    [...usersKeys.all, page, limit, isArchived] as const,
};
