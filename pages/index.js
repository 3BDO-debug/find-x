// layouts
import MainLayout from "src/layouts/main";
// material
import { styled } from "@mui/material/styles";
// components
import Page from "src/components/Page";
import {
  LandingHero,
  LandingAdvertisement,
  Services,
} from "src/components/_external-pages/landing";
import About from "src/components/_external-pages/landing/About";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: "100%",
});

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <MainLayout>
      <RootStyle
        title="Find-X : Workspaces, Meeting rooms &amp; Weeding halls finder."
        id="move_top"
      >
        <LandingHero />
        <ContentStyle>
          <Services />
          <About />
          <LandingAdvertisement />
        </ContentStyle>
      </RootStyle>
    </MainLayout>
  );
}
