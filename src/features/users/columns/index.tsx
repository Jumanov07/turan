import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import EditIcon from "@mui/icons-material/Edit";
import type { User } from "@/features/authentication/interfaces/auth";
import { ROLE_LABELS } from "@/shared/utils/constants";
import type { Column } from "@/shared/types";

type UserRow = Omit<User, "company" | "devices">;

export const createUserColumns = (
  onToggleArchive: (userId: number, isArchived: boolean) => void,
  onEdit: (user: UserRow) => void
): Column<UserRow>[] => [
  {
    id: "id",
    header: "ID",
    cell: (user) => user.id,
  },
  {
    id: "email",
    header: "Почта",
    cell: (user) => user.email,
  },
  {
    id: "firstName",
    header: "Имя",
    cell: (user) => user.firstName,
  },
  {
    id: "lastName",
    header: "Фамилия",
    cell: (user) => user.lastName,
  },
  {
    id: "role",
    header: "Роль",
    cell: (user) => ROLE_LABELS[user.role],
  },
  {
    id: "createdAt",
    header: "Создан",
    cell: (user) => new Date(user.createdAt).toLocaleString("ru-RU"),
  },
  {
    id: "actions",
    header: "Действия",
    align: "right",
    cell: (user) => (
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <IconButton
          color={user.isArchived ? "success" : "warning"}
          onClick={() => onToggleArchive(user.id, user.isArchived)}
        >
          {user.isArchived ? <UnarchiveIcon /> : <ArchiveIcon />}
        </IconButton>

        <IconButton color="primary" onClick={() => onEdit(user)}>
          <EditIcon />
        </IconButton>
      </Box>
    ),
  },
];
