import type { ReactNode } from "react";
import type { Column } from "@/shared/types";
import type { Device } from "@/entities/devices";
import { TableSection } from "@/shared/ui/table-section";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasDevices: boolean;
  emptyText: string;
  devices: Device[];
  columns: Column<Device>[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  toolbar?: ReactNode;
}

export const DevicesTableSection = ({
  isLoading,
  isError,
  hasDevices,
  emptyText,
  devices,
  columns,
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  toolbar,
}: Props) => (
  <TableSection
    isLoading={isLoading}
    isError={isError}
    errorText="Ошибка при загрузке устройств"
    hasItems={hasDevices}
    emptyText={emptyText}
    toolbar={toolbar}
    pagination={{
      page,
      limit,
      total,
      onPageChange,
      rowsPerPageOptions: [5, 10, 20],
      labelRowsPerPage: "Устройств на странице:",
      onLimitChange,
    }}
    rows={devices}
    columns={columns}
    getRowId={(d) => d.id}
  />
);
