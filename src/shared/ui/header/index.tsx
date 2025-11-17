import { Link } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const Header = () => (
  <AppBar position="fixed" sx={{ zIndex: 1201 }}>
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        Turan
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      <Button
        component={Link}
        to="/sign-in"
        color="inherit"
        sx={{
          ":hover": { background: "inherit" },
        }}
      >
        Войти
      </Button>
    </Toolbar>
  </AppBar>
);
