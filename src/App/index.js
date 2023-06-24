import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import getDesignTokens from "../Theme/getDesignToken";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBytoken, sign } from "../Redux/features/UserSlice";
import { domSelector, fetchDomBytoken } from "../Redux/features/DomSlice";
import i18next from "i18next";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import CustomRoutes from "../Routes";
export default function App() {
  const dispatch = useDispatch();
  const userToken = JSON.parse(localStorage?.getItem("userInfo"));
  const domToken = JSON.parse(localStorage?.getItem("dom"));
  userToken !== null && dispatch(fetchUserBytoken(userToken));
  domToken !== null &&
    dispatch(fetchDomBytoken(domToken)) &&
    i18next.changeLanguage(domToken.lang) &&
    document.documentElement.setAttribute("dir", domToken.dir);
  const [mode, setMode] = useState("light");
  const dom = useSelector(domSelector);
  const savedToken = JSON.parse(localStorage?.getItem('token'))
  useEffect(() => {
    let url = window.location;
    let token = new URLSearchParams(url.search).get("token");
    console.log("token in app", token);
    if (token !== null && token !== undefined) {
      dispatch(
        sign({
          type: "owner",
          token: token,
          access_key: "",
          license_key: "",
        })
      );
      console.log("disptched new token");
      localStorage.setItem("token", JSON.stringify(token));
    } else if (savedToken !== null && savedToken !== undefined) {
      dispatch(
        sign({
          type: "owner",
          token: savedToken,
          access_key: "",
          license_key: "",
        })
      );
      console.log("dispatched local token");
    }
  }, []);
  useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  let theme = useMemo(() =>
    createTheme({
      direction: "rtl",
      ...getDesignTokens(mode, [mode]),
    })
  );
  theme = responsiveFontSizes(theme);

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  function RTL(props) {
    if (dom.dir === "rtl") {
      return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
    } else {
      return <>{props.children}</>;
    }
  }
  return (
    <>
      <RTL>
        <ThemeProvider theme={theme}>
          <CustomRoutes setMode={setMode} mode={mode} />
        </ThemeProvider>
      </RTL>
    </>
  );
}
