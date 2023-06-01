import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { type ReactNode } from "react";
import { useState } from "react";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout({ children }: { children: ReactNode }) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const drawerWidth = 240;
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Links for Climate Good
          </Typography>
          {user && (
            <Typography component="div" marginRight={3}>
              {" "}
              Signed in as {user.user_metadata.name}{" "}
            </Typography>
          )}
          {user && (
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <Button color="inherit" variant="outlined" onClick={() => supabaseClient.auth.signOut()}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>{children}</Main>
    </Box>
  );
}
