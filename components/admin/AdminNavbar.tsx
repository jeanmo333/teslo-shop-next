import { useContext } from "react";
import NextLink from "next/link";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";

import { UiContext } from "../../context";

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
              Shopi
            </Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{ display: { xs: "block", sm: "block" } }}>
          <IconButton sx={{ marginRight: 2, color: "white" }}>
            <DehazeIcon onClick={toggleSideMenu} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
