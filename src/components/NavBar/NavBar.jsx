import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export const NavBar = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: "30px" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
          PixaBay Image Finder
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
