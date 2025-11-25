import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
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
          <Button
            size="small"
            variant="contained"
            onClick={() => onVerify(d.id)}
          >
            Подтвердить
          </Button>
        )}

        <IconButton color="error" onClick={() => onDelete(d.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];
