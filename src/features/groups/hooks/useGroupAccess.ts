import { useRoleAccess } from "@/shared/hooks";

export const useGroupAccess = () => {
  const { isAdmin, canManageMetersToGroups } = useRoleAccess();

  return {
    isAdmin,
    canManageMetersToGroups,
  };
};
