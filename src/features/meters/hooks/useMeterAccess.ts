import { useRoleAccess } from "@/shared/hooks";

export const useMeterAccess = () => {
  const { isAdmin, canEditMeters, canManageMetersToGroups } = useRoleAccess();

  return {
    isAdmin,
    canEdit: canEditMeters,
    canManageMetersToGroups,
  };
};
