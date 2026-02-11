import {
  createUserColumns,
  useUserActions,
  useUserFilters,
  useUsersQuery,
} from "@/features/users";
import { useAuthStore } from "@/shared/stores";
import { canDeleteUsers } from "@/shared/helpers";
import { usePagination } from "@/shared/hooks";
import { UsersHeader } from "./ui/users-header";
import { UsersModals } from "./ui/users-modals";
import { UsersTableSection } from "./ui/users-table-section";
import { useUsersUiState } from "./hooks/useUsersUiState";

export const UsersWidget = () => {
  const { user } = useAuthStore();

  const { isArchived, setIsArchived, filtersKey } = useUserFilters();

  const { page, limit, setPage, setLimit } = usePagination({
    resetKey: filtersKey,
  });

  const { users, total, hasUsers, emptyText, isLoading, isError } =
    useUsersQuery({ page, limit, isArchived });

  const { handleToggleArchive, handleDeleteUser } = useUserActions();

  const {
    isModalOpen,
    editingUser,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useUsersUiState();

  const canDelete = canDeleteUsers(user?.role);

  const columns = createUserColumns(
    handleToggleArchive,
    openEditModal,
    canDelete,
    handleDeleteUser,
  );

  return (
    <>
      <UsersTableSection
        isLoading={isLoading}
        isError={isError}
        hasUsers={hasUsers}
        emptyText={emptyText}
        users={users}
        columns={columns}
        page={page}
        limit={limit}
        total={total}
        onPageChange={setPage}
        onLimitChange={setLimit}
        toolbar={
          <UsersHeader
            isArchived={isArchived}
            onChangeArchived={setIsArchived}
            onCreate={openCreateModal}
          />
        }
      />

      <UsersModals
        isOpen={isModalOpen}
        editingUser={editingUser}
        onClose={closeModal}
      />
    </>
  );
};
