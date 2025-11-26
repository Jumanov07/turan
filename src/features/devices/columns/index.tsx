import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import type { Column } from "@/shared/types";
import type { Device } from "../interfaces";

export const createDeviceColumns = (
  onVerify: (id: number) => void,
  onDelete: (id: number) => void
): Column<Device>[] => [
  {
    id: "id",
    header: "ID",
    cell: (d) => d.id,
  },
  {
    id: "deviceId",
    header: "Device ID",
    cell: (d) => d.deviceId,
  },
  {
    id: "user",
    header: "Пользователь",
    cell: (d) => {
      const user = d.user;

      if (!user) return "-";

      const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

      return fullName || user.email || "-";
    },
  },
  {
    id: "createdAt",
    header: "Создан",
    cell: (d) => new Date(d.createdAt).toLocaleString("ru-RU"),
  },
  {
    id: "actions",
    header: "Действия",
    align: "right",
    cell: (d) => (
      <Box display="flex" justifyContent="flex-end" gap={1}>
        {!d.verified && (
          <IconButton color="success" onClick={() => onVerify(d.id)}>
            <CheckIcon />
          </IconButton>
        )}

        <IconButton color="error" onClick={() => onDelete(d.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];
