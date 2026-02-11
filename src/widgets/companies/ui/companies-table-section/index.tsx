import type { ReactNode } from "react";
import type { Column } from "@/shared/types";
import type { Company } from "@/entities/companies";
import { TableSection } from "@/shared/ui/table-section";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasCompanies: boolean;
  emptyText: string;
  companies: Company[];
  columns: Column<Company>[];
  toolbar?: ReactNode;
}

export const CompaniesTableSection = ({
  isLoading,
  isError,
  hasCompanies,
  emptyText,
  companies,
  columns,
  toolbar,
}: Props) => (
  <TableSection
    isLoading={isLoading}
    isError={isError}
    errorText="Ошибка при загрузке компаний"
    errorVariant="filled"
    hasItems={hasCompanies}
    emptyText={emptyText}
    toolbar={toolbar}
    rows={companies}
    columns={columns}
    getRowId={(c) => c.id}
  />
);
