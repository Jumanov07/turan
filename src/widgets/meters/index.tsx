import { useState } from "react";
import Box from "@mui/material/Box";
import {
  createMeterColumns,
  useMeters,
} from "@/features/meters";
import { useGroups } from "@/features/groups";
import type { Meter } from "@/entities/meters";
import { MetersHeader } from "./ui/meters-header";
import { MetersModals } from "./ui/meters-modals";
import { MetersTableSection } from "./ui/meters-table-section";

export const MetersWidget = () => {
  const [editingMeter, setEditingMeter] = useState<Meter | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [detailsMeter, setDetailsMeter] = useState<Meter | null>(null);
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [groupModalMode, setGroupModalMode] = useState<"add" | "remove">("add");
  const [groupModalGroupId, setGroupModalGroupId] = useState<number | null>(
    null,
  );

  const {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    page,
    limit,
    setPage,
    setLimit,
    status,
    setStatus,
    isArchived,
    setIsArchived,
    valveFilter,
    setValveFilter,
    groupId,
    setGroupId,
    customerId,
    setCustomerId,
    meterName,
    setMeterName,
    isAdmin,
    canEdit,
    canManageMetersToGroups,
    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    handleDeleteOne,
    handleDeleteSelected,
    handleCommand,
    handleResetFilters,
    clearSelection,
  } = useMeters();

  const { groups, handleAddMetersToGroup, handleRemoveMetersFromGroup } =
    useGroups({
      forFilter: true,
    });

  const handleEdit = (meter: Meter) => {
    if (!canEdit) return;
    setEditingMeter(meter);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingMeter(null);
    setEditModalOpen(false);
  };

  const handleView = (meter: Meter) => {
    setDetailsMeter(meter);
    setDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsMeter(null);
    setDetailsOpen(false);
  };

  const openAddToGroupModal = () => {
    if (
      !canManageMetersToGroups ||
      selectedIds.length === 0 ||
      groups.length === 0
    ) {
      return;
    }

    setGroupModalMode("add");
    setGroupModalGroupId(groupId ?? null);
    setGroupModalOpen(true);
  };

  const openRemoveFromGroupModal = () => {
    if (
      !canManageMetersToGroups ||
      selectedIds.length === 0 ||
      groups.length === 0
    ) {
      return;
    }

    setGroupModalMode("remove");
    setGroupModalGroupId(groupId ?? null);
    setGroupModalOpen(true);
  };

  const closeGroupModal = () => {
    setGroupModalOpen(false);
    setGroupModalGroupId(null);
  };

  const handleConfirmGroupModal = () => {
    if (!groupModalGroupId || selectedIds.length === 0) return;

    if (groupModalMode === "add") {
      handleAddMetersToGroup(groupModalGroupId, selectedIds);
    } else {
      handleRemoveMetersFromGroup(groupModalGroupId, selectedIds);
    }

    clearSelection();
    closeGroupModal();
  };

  const columns = createMeterColumns({
    isAdmin,
    canEdit,
    canManageMetersToGroups,
    selectedIds,
    allSelected,
    isIndeterminate,
    onToggleAll: handleToggleAll,
    onToggleOne: handleToggleOne,
    onEdit: handleEdit,
    onDeleteOne: handleDeleteOne,
    onCommand: handleCommand,
    onView: handleView,
  });

  return (
    <>
      <Box>
        <MetersHeader
          isError={isError}
          isAdmin={isAdmin}
          canManageMetersToGroups={canManageMetersToGroups}
          selectedCount={selectedIds.length}
          hasGroups={groups.length > 0}
          onOpenFilters={() => setFiltersOpen(true)}
          onDeleteSelected={handleDeleteSelected}
          onAddSelectedToGroup={openAddToGroupModal}
          onRemoveSelectedFromGroup={openRemoveFromGroupModal}
          onResetFilters={handleResetFilters}
        />

        <MetersTableSection
          isLoading={isLoading}
          isError={isError}
          hasMeters={hasMeters}
          emptyText={emptyText}
          meters={meters}
          columns={columns}
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </Box>

      <MetersModals
        editOpen={isEditModalOpen}
        editingMeter={editingMeter}
        onCloseEdit={closeEditModal}
        canArchive={isAdmin}
        detailsOpen={isDetailsOpen}
        detailsMeter={detailsMeter}
        onCloseDetails={closeDetailsModal}
        groupModalOpen={groupModalOpen}
        groupModalMode={groupModalMode}
        groups={groups}
        selectedCount={selectedIds.length}
        selectedGroupId={groupModalGroupId}
        onChangeGroup={setGroupModalGroupId}
        onCloseGroupModal={closeGroupModal}
        onConfirmGroupModal={handleConfirmGroupModal}
        filtersOpen={isFiltersOpen}
        onCloseFilters={() => setFiltersOpen(false)}
        status={status}
        onStatusChange={setStatus}
        valveFilter={valveFilter}
        onValveFilterChange={setValveFilter}
        isArchived={isArchived}
        onArchivedChange={setIsArchived}
        groupId={groupId}
        onGroupChange={setGroupId}
        customerId={customerId}
        onCustomerIdChange={setCustomerId}
        meterName={meterName}
        onMeterNameChange={setMeterName}
      />
    </>
  );
};
