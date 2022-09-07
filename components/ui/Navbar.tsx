import { useContext, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import DehazeIcon from "@mui/icons-material/Dehaze";

import { CartContext, UiContext } from "../../context";

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  return (
    <AppBar sx={{ boxShadow: 1, backgroundColor: '#ddd' }}>
      <Toolbar>
        {/********************************************** */}
        <Box sx={{ display: { xs: "block", sm: "block" } }}>
          <IconButton sx={{ marginRight: 2 }}>
            <DehazeIcon onClick={toggleSideMenu} />
          </IconButton>
        </Box>
        {/********************************************** */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 25 }}>Shopi</Typography>
            
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
          className="fadeIn">
          <NextLink href="/category/men" passHref>
            <Link>
              <Button sx={{marginRight: 1}} color={asPath === "/category/men" ? "primary" : "info"}>
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button sx={{marginRight: 1}}  color={asPath === "/category/women" ? "primary" : "info"}>
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Link>
              <Button color={asPath === "/category/kid" ? "primary" : "info"}>
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>

        {/********************************************** */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 25  }}>Shopi</Typography>
            </Link>
          </NextLink>
        </Box>
        {/********************************************** */}

        <Box flex={1} />

        {/* Pantallas pantallas grandes */}
        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" } }}>
            <SearchOutlined />
          </IconButton>
        )}

        {/* Pantallas pequeñas */}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge
                badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
