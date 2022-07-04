import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";
import { useRecoilState } from "recoil";
// next
import { useRouter } from "next/router";
// material
import { styled, useTheme } from "@mui/material/styles";
// recoil
import { userState } from "src/recoil/atoms/auth";
// hooks
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
// apis
import { userInfoRequest } from "src/apis/auth";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { MIconButton } from "src/components/@material-extend";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default function DashboardLayout({ children }) {
  const theme = useTheme();
  const router = useRouter();
  const { collapseClick } = useCollapseDrawer();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(async () => {
    if (localStorage.getItem("access_token")) {
      await userInfoRequest()
        .then((userInfoResponse) => setUser(userInfoResponse))
        .catch((error) => console.log("Error at user info -- main", error));
    } else {
      setUser(null);
      router.push("/auth/login");
      enqueueSnackbar(
        "Session expired, please login to enjoy full experience",
        {
          variant: "error",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        }
      );
    }
  }, [router.pathname]);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle
        sx={{
          transition: theme.transitions.create("margin", {
            duration: theme.transitions.duration.complex,
          }),
          ...(collapseClick && {
            ml: "102px",
          }),
        }}
      >
        {children}
      </MainStyle>
    </RootStyle>
  );
}
