import { MetersActions } from "@/features/meters";

interface Props {
  isAdmin: boolean;
  canManageMetersToGroups: boolean;
  selectedCount: number;
  hasGroups: boolean;
  onOpenFilters: () => void;
  onDeleteSelected: () => void;
  onAddSelectedToGroup: () => void;
  onRemoveSelectedFromGroup: () => void;
  onResetFilters: () => void;
}

export const MetersHeader = ({
  isAdmin,
  canManageMetersToGroups,
  selectedCount,
  hasGroups,
  onOpenFilters,
  onDeleteSelected,
  onAddSelectedToGroup,
  onRemoveSelectedFromGroup,
  onResetFilters,
}: Props) => (
  <MetersActions
    isAdmin={isAdmin}
    canManageMetersToGroups={canManageMetersToGroups}
    selectedCount={selectedCount}
    hasGroups={hasGroups}
    onOpenFilters={onOpenFilters}
    onDeleteSelected={onDeleteSelected}
    onAddSelectedToGroup={onAddSelectedToGroup}
    onRemoveSelectedFromGroup={onRemoveSelectedFromGroup}
    onResetFilters={onResetFilters}
  />
);
