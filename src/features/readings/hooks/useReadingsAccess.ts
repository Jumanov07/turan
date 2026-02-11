import { useRoleAccess } from "@/shared/hooks";

export const useReadingsAccess = () => {
  const { isAdmin } = useRoleAccess();

  return {
    isAdmin,
  };
};
