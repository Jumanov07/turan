import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { Group } from "@/features/groups/interface";
import { Modal } from "@/shared/ui/modal";

interface Props {
  status: string;
  onStatusChange: (status: string) => void;
  valveFilter: "all" | "open" | "closed";
  onValveFilterChange: (value: "all" | "open" | "closed") => void;
  isArchived: boolean;
  onArchivedChange: (isArchived: boolean) => void;
  groupId: number | null;
  onGroupChange: (groupId: number | null) => void;
  groups: Group[];
  isAdmin: boolean;
  canManageMetersToGroups: boolean;
  selectedCount: number;
  onDeleteSelected: () => void;
  onAddSelectedToGroup: () => void;
  onRemoveSelectedFromGroup: () => void;
}

export const MetersActions = ({
  status,
  onStatusChange,
  valveFilter,
  onValveFilterChange,
  isArchived,
  onArchivedChange,
  groupId,
  onGroupChange,
  groups,
  isAdmin,
  canManageMetersToGroups,
  selectedCount,
  onDeleteSelected,
  onAddSelectedToGroup,
  onRemoveSelectedFromGroup,
}: Props) => {
  const [isFiltersOpen, setFiltersOpen] = useState(false);

  const handleOpenFilters = () => setFiltersOpen(true);
  const handleCloseFilters = () => setFiltersOpen(false);

  return (
    <>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Button variant="outlined" onClick={handleOpenFilters}>
          Фильтры
        </Button>

        <Box display="flex" gap={1}>
          {canManageMetersToGroups && (
            <>
              <Button
                variant="outlined"
                disabled={selectedCount === 0 || groups.length === 0}
                onClick={onAddSelectedToGroup}
              >
                Добавить в группу
              </Button>

              <Button
                variant="outlined"
                disabled={selectedCount === 0 || groups.length === 0}
                onClick={onRemoveSelectedFromGroup}
              >
                Удалить из группы
              </Button>
            </>
          )}

          {isAdmin && (
            <Button
              variant="outlined"
              color="error"
              disabled={selectedCount === 0}
              onClick={onDeleteSelected}
            >
              Удалить выбранные
            </Button>
          )}
        </Box>
      </Box>

      <Modal open={isFiltersOpen} onClose={handleCloseFilters} title="Фильтры">
        <Box display="flex" flexDirection="column" gap={2}>
          <Select
            fullWidth
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <MenuItem value="normal">Нормальные</MenuItem>
            <MenuItem value="warning">Предупреждения</MenuItem>
            <MenuItem value="error">С ошибками</MenuItem>
            <MenuItem value="all">Все статусы</MenuItem>
          </Select>

          <Select
            fullWidth
            value={valveFilter}
            onChange={(e) =>
              onValveFilterChange(e.target.value as "all" | "open" | "closed")
            }
          >
            <MenuItem value="all">Все клапаны</MenuItem>
            <MenuItem value="open">Клапан открыт</MenuItem>
            <MenuItem value="closed">Клапан закрыт</MenuItem>
          </Select>

          <Select
            fullWidth
            value={groupId ?? "all"}
            onChange={(e) => {
              const value = e.target.value;
              onGroupChange(value === "all" ? null : Number(value));
            }}
          >
            <MenuItem value="all">Все группы</MenuItem>

            {groups.map((g) => (
              <MenuItem key={g.id} value={g.id}>
                {g.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            fullWidth
            value={isArchived ? "archived" : "active"}
            onChange={(e) => onArchivedChange(e.target.value === "archived")}
          >
            <MenuItem value="active">Активные</MenuItem>
            <MenuItem value="archived">Архивные</MenuItem>
          </Select>

          <Box display="flex" justifyContent="flex-end" gap={1} mt={1}>
            <Button onClick={handleCloseFilters}>Закрыть</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
