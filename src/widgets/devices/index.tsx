import {
  createDeviceColumns,
  useDeviceActions,
  useDeviceFilters,
  useDeviceSelection,
  useDevicesQuery,
} from "@/features/devices";
import { usePagination } from "@/shared/hooks";
import { DevicesHeader } from "./ui/devices-header";
import { DevicesTableSection } from "./ui/devices-table-section";

export const DevicesWidget = () => {
  const { verified, setVerified, filtersKey } = useDeviceFilters();

  const { page, limit, setPage, setLimit } = usePagination({
    resetKey: filtersKey,
  });

  const { devices, total, hasDevices, emptyText, isLoading, isError } =
    useDevicesQuery({ page, limit, verified });

  const {
    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    removeSelected,
  } = useDeviceSelection({
    devices,
    resetKey: [page, limit, verified].join("|"),
  });

  const { handleVerify, handleDeleteOne, handleDeleteSelected } =
    useDeviceActions({
      onRemoved: removeSelected,
    });

  const handleDeleteSelectedWithIds = () => {
    handleDeleteSelected(selectedIds);
  };

  const columns = createDeviceColumns({
    selectedIds,
    allSelected,
    isIndeterminate,
    onToggleAll: handleToggleAll,
    onToggleOne: handleToggleOne,
    onVerify: handleVerify,
    onDeleteOne: handleDeleteOne,
  });

  return (
    <DevicesTableSection
      isLoading={isLoading}
      isError={isError}
      hasDevices={hasDevices}
      emptyText={emptyText}
      devices={devices}
      columns={columns}
      page={page}
      limit={limit}
      total={total}
      onPageChange={setPage}
      onLimitChange={setLimit}
      toolbar={
        <DevicesHeader
          verified={verified}
          onChangeVerified={setVerified}
          selectedCount={selectedIds.length}
          onDeleteSelected={handleDeleteSelectedWithIds}
        />
      }
    />
  );
};
