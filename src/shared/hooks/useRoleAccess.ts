import { useAuthStore } from "@/shared/stores";
import {
  canDeleteUsers,
  canEditMeters,
  canManageMetersToGroups,
  hasRoleAdmin,
  hasRoleSuperAdmin,
} from "@/shared/helpers";

export const useRoleAccess = () => {
  const user = useAuthStore((state) => state.user);
  const role = user?.role;

  return {
    user,
    role,
    isAdmin: hasRoleAdmin(role),
    isSuperAdmin: hasRoleSuperAdmin(role),
    canEditMeters: canEditMeters(role),
    canManageMetersToGroups: canManageMetersToGroups(role),
    canDeleteUsers: canDeleteUsers(role),
  };
};
