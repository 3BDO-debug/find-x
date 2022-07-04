import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";
// next
import { useRouter } from "next/router";
// recoil
import { useRecoilState } from "recoil";
// atoms
import { userState } from "src/recoil/atoms/auth";
//apis
import { userInfoRequest } from "src/apis/auth";
// components
import { MIconButton } from "src/components/@material-extend";
//
import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default function MainLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(async () => {
    if (localStorage.getItem("access_token")) {
      await userInfoRequest()
        .then((userInfoResponse) => setUser(userInfoResponse))
        .catch((error) => console.log("Error at user info -- main", error));
    } else {
      setUser(null);
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

  console.log("fuck", user);

  return (
    <>
      <MainNavbar />
      <div>{children}</div>

      <MainFooter />
    </>
  );
}
