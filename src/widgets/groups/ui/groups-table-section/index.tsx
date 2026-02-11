import type { ReactNode } from "react";
import type { Column } from "@/shared/types";
import type { Group } from "@/entities/groups";
import { TableSection } from "@/shared/ui/table-section";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasGroups: boolean;
  emptyText: string;
  groups: Group[];
  columns: Column<Group>[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  toolbar?: ReactNode;
}

export const GroupsTableSection = ({
  isLoading,
  isError,
  hasGroups,
  emptyText,
  groups,
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
    errorText="Ошибка при загрузке групп"
    hasItems={hasGroups}
    emptyText={emptyText}
    toolbar={toolbar}
    pagination={{
      page,
      limit,
      total,
      onPageChange,
      rowsPerPageOptions: [5, 10, 20],
      labelRowsPerPage: "Групп на странице:",
      onLimitChange,
    }}
    rows={groups}
    columns={columns}
    getRowId={(g) => g.id}
  />
);
