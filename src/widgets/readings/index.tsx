import {
  createReadingColumns,
  useReadingsAccess,
  useReadingsActions,
  useReadingsQuery,
  useReadingsSelection,
} from "@/features/readings";
import { usePagination } from "@/shared/hooks";
import { ReadingsHeader } from "./ui/readings-header";
import { ReadingsTableSection } from "./ui/readings-table-section";

export const ReadingsWidget = () => {
  const { page, limit, setPage, setLimit } = usePagination({});

  const { isAdmin } = useReadingsAccess();

  const { readings, total, hasReadings, emptyText, isLoading, isError } =
    useReadingsQuery({ page, limit });

  const {
    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    removeSelected,
  } = useReadingsSelection({
    readings,
    isAdmin,
    resetKey: [page, limit].join("|"),
  });

  const { handleDeleteOne, handleDeleteSelected } = useReadingsActions({
    isAdmin,
    onRemoved: removeSelected,
  });

  const handleDeleteSelectedWithIds = () => {
    handleDeleteSelected(selectedIds);
  };

  const columns = createReadingColumns({
    isAdmin,
    selectedIds,
    allSelected,
    isIndeterminate,
    onToggleAll: handleToggleAll,
    onToggleOne: handleToggleOne,
    onDeleteOne: handleDeleteOne,
  });

  return (
    <ReadingsTableSection
      isLoading={isLoading}
      isError={isError}
      hasReadings={hasReadings}
      emptyText={emptyText}
      readings={readings}
      columns={columns}
      page={page}
      limit={limit}
      total={total}
      onPageChange={setPage}
      onLimitChange={setLimit}
      toolbar={
        <ReadingsHeader
          isAdmin={isAdmin}
          selectedCount={selectedIds.length}
          onDeleteSelected={handleDeleteSelectedWithIds}
        />
      }
    />
  );
};
