import { useEffect, useMemo, useState } from "react";

interface Params<T, Id extends string | number> {
  items: T[];
  getId: (item: T) => Id;
  enabled?: boolean;
  resetKey?: string | number;
}

export const useSelection = <T, Id extends string | number>({
  items,
  getId,
  enabled = true,
  resetKey,
}: Params<T, Id>) => {
  const [selectedIds, setSelectedIds] = useState<Id[]>([]);

  const itemIds = useMemo(() => items.map(getId), [items, getId]);

  const allSelected =
    enabled && itemIds.length > 0 && selectedIds.length === itemIds.length;
  const isIndeterminate = enabled && selectedIds.length > 0 && !allSelected;

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const toggleAll = (checked: boolean) => {
    if (!enabled) return;

    setSelectedIds(checked ? itemIds : []);
  };

  const toggleOne = (id: Id) => {
    if (!enabled) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const removeSelected = (ids: Id[]) => {
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
  };

  useEffect(() => {
    if (resetKey === undefined) return;
    setSelectedIds((prev) => (prev.length ? [] : prev));
  }, [resetKey]);

  useEffect(() => {
    if (!enabled) {
      setSelectedIds((prev) => (prev.length ? [] : prev));
    }
  }, [enabled]);

  return {
    selectedIds,
    allSelected,
    isIndeterminate,
    toggleAll,
    toggleOne,
    clearSelection,
    removeSelected,
  };
};
