import { useQuery } from "@tanstack/react-query";
import { getCompanies, type Company } from "@/entities/companies";

interface Params {
  isArchived: boolean;
}

export const useCompaniesQuery = ({ isArchived }: Params) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["companies", isArchived],
    queryFn: () => getCompanies(isArchived),
  });

  const companies: Company[] = data ?? [];
  const hasCompanies = companies.length > 0;

  const emptyText = isArchived
    ? "Нет архивных компаний"
    : "Нет активных компаний";

  return {
    companies,
    hasCompanies,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
