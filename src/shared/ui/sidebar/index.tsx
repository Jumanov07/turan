import { Link } from "react-router";
import { Drawer } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Toolbar } from "@mui/material";
import { MENU } from "@/shared/utils/constants";

export const Sidebar = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: 240,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: 240,
        boxSizing: "border-box",
      },
    }}
  >
    <Toolbar />

    <List>
      {MENU.map((item) => (
        <ListItem key={item.to} disablePadding>
          <ListItemButton component={Link} to={item.to}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Drawer>
);
