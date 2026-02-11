export const devicesKeys = {
  all: ["devices"] as const,
  list: (page: number, limit: number, verified: boolean) =>
    [...devicesKeys.all, page, limit, verified] as const,
};
