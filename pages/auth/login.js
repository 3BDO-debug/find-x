import { capitalCase } from "change-case";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography, Tooltip } from "@mui/material";
// layouts
import AuthLayout from "src/layouts/AuthLayout";
// components
import Page from "src/components/Page";
import { MHidden } from "src/components/@material-extend";
import LoginForm from "src/components/_auth/login/LoginForm";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const router = useRouter();

  return (
    <RootStyle title="Find-X | Login now">
      <AuthLayout>
        {router.pathname === "/auth/login" ? (
          <>
            Don't have an account? &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              sx={{ cursor: "pointer" }}
              onClick={() => router.push("/auth/register")}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account? &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              sx={{ cursor: "pointer" }}
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Link>
          </>
        )}
      </AuthLayout>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Get started absolutely free.
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Free forever. No credit card needed.
              </Typography>
            </Box>
            <Tooltip title={capitalCase("jwt")}>
              <Box
                component="img"
                src={`/static/auth/ic_${"jwt"}.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip>
          </Box>

          <LoginForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            By registering, I agree to Minimal&nbsp;
            <NextLink underline="always" color="text.primary" href="#">
              Terms of Service
            </NextLink>
            &nbsp;and&nbsp;
            <NextLink underline="always" color="text.primary" href="#">
              Privacy Policy
            </NextLink>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?&nbsp;
              <NextLink href="/auth/login">Login</NextLink>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
