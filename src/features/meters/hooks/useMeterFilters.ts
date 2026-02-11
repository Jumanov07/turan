import { useMemo, useState } from "react";

export interface MeterFilters {
  meterName: string;
  customerId: string;
  status: string;
  isArchived: boolean;
  groupId: number | null;
  valveFilter: "all" | "open" | "closed";
}

const initialFilters: MeterFilters = {
  meterName: "",
  customerId: "",
  status: "all",
  isArchived: false,
  groupId: null,
  valveFilter: "all",
};

export const useMeterFilters = () => {
  const [filters, setFilters] = useState<MeterFilters>(initialFilters);

  const filtersKey = useMemo(
    () =>
      [
        filters.status,
        filters.isArchived ? "archived" : "active",
        filters.groupId ?? "null",
        filters.customerId,
        filters.meterName,
        filters.valveFilter,
      ].join("|"),
    [filters],
  );

  const updateFilters = (patch: Partial<MeterFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const setStatus = (value: string) => updateFilters({ status: value });
  const setIsArchived = (value: boolean) =>
    updateFilters({ isArchived: value });
  const setGroupId = (value: number | null) =>
    updateFilters({ groupId: value });
  const setCustomerId = (value: string) => updateFilters({ customerId: value });
  const setMeterName = (value: string) => updateFilters({ meterName: value });
  const setValveFilter = (value: "all" | "open" | "closed") =>
    updateFilters({ valveFilter: value });

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    filtersKey,
    setStatus,
    setIsArchived,
    setGroupId,
    setCustomerId,
    setMeterName,
    setValveFilter,
    resetFilters,
  };
};
