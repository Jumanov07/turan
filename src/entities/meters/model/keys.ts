export const metersKeys = {
  all: ["meters"] as const,
  list: (
    page: number,
    limit: number,
    status?: string,
    isArchived?: boolean,
    groupId?: number | null,
    customerId?: string,
    meterName?: string,
  ) =>
    [
      ...metersKeys.all,
      page,
      limit,
      status,
      isArchived,
      groupId,
      customerId,
      meterName,
    ] as const,
};
