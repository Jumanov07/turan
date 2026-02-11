import {
  createUserColumns,
  useUserActions,
  useUserFilters,
  useUsersQuery,
} from "@/features/users";
import { useAuthStore } from "@/shared/stores";
import { canDeleteUsers } from "@/shared/helpers";
import { usePagination } from "@/shared/hooks";
import { TableSection } from "@/shared/ui/table-section";
import { UsersHeader } from "./ui/users-header";
import { UsersModals } from "./ui/users-modals";
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
      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText="Ошибка при загрузке пользователей"
        hasItems={hasUsers}
        emptyText={emptyText}
        toolbar={
          <UsersHeader
            isArchived={isArchived}
            onChangeArchived={setIsArchived}
            onCreate={openCreateModal}
          />
        }
        pagination={{
          page,
          limit,
          total,
          onPageChange: setPage,
          rowsPerPageOptions: [5, 10, 20],
          labelRowsPerPage: "Пользователей на странице:",
          onLimitChange: setLimit,
        }}
        rows={users}
        columns={columns}
        getRowId={(user) => user.id}
      />

      <UsersModals
        isOpen={isModalOpen}
        editingUser={editingUser}
        onClose={closeModal}
      />
    </>
  );
};
