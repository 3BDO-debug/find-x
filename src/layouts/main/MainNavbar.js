import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@iconify/react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// recoil
import { useRecoilValue } from "recoil";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Avatar,
  Tooltip,
  Skeleton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
// hooks
import useOffSetTop from "../../hooks/useOffSetTop";
// apis
import { mainUrl } from "src/apis/axios";
// atoms
import { userState } from "src/recoil/atoms/auth";
// components
import { varFadeInRight } from "../../components/animate";
import Logo from "../../components/Logo";
import Label from "../../components/Label";
import { MHidden } from "../../components/@material-extend";
//
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import navConfig from "./MenuConfig";
import { logoutRequest } from "src/apis/auth";
import { MIconButton } from "src/components/@material-extend";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP,
  },
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const isOffset = useOffSetTop(100);
  const { pathname, push } = useRouter();
  const user = useRecoilValue(userState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleLogout = () => {
    logoutRequest()
      .then(() => {
        push("/auth/login");
        enqueueSnackbar("Logged out successfully, we will miss u.", {
          variant: "success",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
      })
      .catch((error) =>
        enqueueSnackbar(`Something wrong happened-${error}`, {
          variant: "error",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        })
      );
  };

  const renderNavActions = () => {
    let context;
    if (pathname === "/places") {
      if (user?.is_host) {
        context = (
          <Button
            onClick={() => push("/portal/overview")}
            startIcon={<Icon icon="mdi:earth" />}
            variant="contained"
          >
            Hosting portal
          </Button>
        );
      } else {
        context = (
          <Button
            onClick={() => push("/portal")}
            startIcon={<Icon icon="mdi:earth" />}
            variant="contained"
          >
            Become a host
          </Button>
        );
      }
    } else if (pathname === "/") {
      context = (
        <Button onClick={() => push("/places")} variant="contained">
          Find-X Now
        </Button>
      );
    } else if (pathname.includes("place")) {
      context = (
        <NextLink href="/places">
          <Button
            variant="contained"
            startIcon={<Icon icon="carbon:explore" />}
          >
            Explore more
          </Button>
        </NextLink>
      );
    }
    return context;
  };

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: "transparent" }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: "background.default",
            height: { md: APP_BAR_DESKTOP - 16 },
          }),
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <NextLink href="/">
            <motion.img
              variants={varFadeInRight}
              style={{ maxWidth: "70px" }}
              src="/static/home/ic_hustle.png"
            />
          </NextLink>

          <Box sx={{ flexGrow: 1 }} />

          {/*  <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden> */}

          {renderNavActions()}
          {user ? (
            <>
              <IconButton sx={{ ml: 2 }} onClick={handleLogout}>
                <Tooltip title="Logout">
                  <LogoutIcon />
                </Tooltip>
              </IconButton>
              <IconButton
                sx={{ marginLeft: 2 }}
                onClick={() => push(`/profile/${user?.id}`)}
              >
                <Avatar
                  src={`${user?.profile_pic_url}`}
                  alt={`${user?.first_name} ${user?.last_name}`}
                />
              </IconButton>
            </>
          ) : (
            <NextLink href="/auth/login">
              <Button
                startIcon={<Icon icon="bx:bx-user-circle" />}
                sx={{ ml: 2 }}
                variant="outlined"
              >
                Login or Register
              </Button>
            </NextLink>
          )}

          {/*           <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden> */}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
