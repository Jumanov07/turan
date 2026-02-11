import {
  createGroupColumns,
  useGroupAccess,
  useGroupActions,
  useGroupsQuery,
} from "@/features/groups";
import { usePagination } from "@/shared/hooks";
import { GroupsHeader } from "./ui/groups-header";
import { GroupsModals } from "./ui/groups-modals";
import { GroupsTableSection } from "./ui/groups-table-section";
import { useGroupsUiState } from "./hooks/useGroupsUiState";

export const GroupsWidget = () => {
  const { page, limit, setPage, setLimit } = usePagination({});

  const { isAdmin, canManageMetersToGroups } = useGroupAccess();

  const { groups, total, hasGroups, emptyText, isLoading, isError } =
    useGroupsQuery({
      page,
      limit,
      forFilter: false,
    });

  const { handleDelete } = useGroupActions({
    isAdmin,
    canManageMetersToGroups,
  });

  const {
    isModalOpen,
    editingGroup,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useGroupsUiState();

  const handleOpenCreateModal = () => {
    if (!isAdmin) return;
    openCreateModal();
  };

  const handleOpenEditModal = (group: (typeof groups)[number]) => {
    if (!isAdmin) return;
    openEditModal(group);
  };

  const columns = createGroupColumns(handleOpenEditModal, handleDelete, isAdmin);

  return (
    <>
      <GroupsTableSection
        isLoading={isLoading}
        isError={isError}
        hasGroups={hasGroups}
        emptyText={emptyText}
        groups={groups}
        columns={columns}
        page={page}
        limit={limit}
        total={total}
        onPageChange={setPage}
        onLimitChange={setLimit}
        toolbar={
          <GroupsHeader isAdmin={isAdmin} onCreate={handleOpenCreateModal} />
        }
      />

      <GroupsModals
        isOpen={isModalOpen}
        editingGroup={editingGroup}
        onClose={closeModal}
      />
    </>
  );
};
