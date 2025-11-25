import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Group } from "../../interface";

interface Props {
  groups: Group[];
  onEdit: (group: Group) => void;
  onDelete: (groupId: number) => void;
  isAdmin: boolean;
}

export const GroupsTable = ({ groups, onEdit, onDelete, isAdmin }: Props) => (
  <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Название</TableCell>
          <TableCell>Создано</TableCell>
          {isAdmin && <TableCell align="right">Действия</TableCell>}
        </TableRow>
      </TableHead>

      <TableBody>
        {groups.map((group) => {
          const { id, name, createdAt } = group;

          return (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>
                {new Date(createdAt).toLocaleString("ru-RU")}
              </TableCell>

              {isAdmin && (
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton color="primary" onClick={() => onEdit(group)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton color="error" onClick={() => onDelete(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);
