// scroll bar
import "simplebar/src/simplebar.css";
// editor
import "react-quill/dist/quill.snow.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// next
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
// recoil
import { RecoilRoot } from "recoil";
// contexts
import { SettingsProvider } from "src/contexts/SettingsContext";
import { CollapseDrawerProvider } from "src/contexts/CollapseDrawerContext";
// theme
import ThemeConfig from "src/theme";
import GlobalStyles from "src/theme/globalStyles";
// utils
import createEmotionCache from "src/utils/createEmotionCache";
// components
import RtlLayout from "src/components/RtlLayout";
import ProgressBar from "src/components/ProgressBar";
import LoadingScreen from "src/components/LoadingScreen";
import ThemePrimaryColor from "src/components/ThemePrimaryColor";
import NotistackProvider from "src/components/NotistackProvider";

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <SettingsProvider>
      <CollapseDrawerProvider>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>

          <ThemeConfig>
            <ThemePrimaryColor>
              <RtlLayout>
                <NotistackProvider>
                  <GlobalStyles />
                  <ProgressBar />
                  <LoadingScreen />
                  <RecoilRoot>
                    <Component {...pageProps} />
                  </RecoilRoot>
                </NotistackProvider>
              </RtlLayout>
            </ThemePrimaryColor>
          </ThemeConfig>
        </CacheProvider>
      </CollapseDrawerProvider>
    </SettingsProvider>
  );
}
