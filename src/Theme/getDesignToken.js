const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            light: "#ae89d9",
            main: "#986dcf",
            dark: "#8151c5",
          },
          secondary: {
            light: "#8ae26e",
            main: "#64da46",
            dark: "#2ad100",
          },
          divider: "#d9d9d9",
          text: {
            primary: {
              light: "#1b1422",
              main: "#2d1f3f",
              dark: "#412b5e",
            },
            secondary: {
              light: "#15240e",
              main: "#1d4213",
              dark: "#246315",
            },
          },
          background: {
            primary: {
              paper: "#d9d9d9",
              default: "#b4b4b4 ",
            },
          },

          success: {
            main: "#40BF6A",
          },
          warning: {
            main: "#EBB513",
          },
          error: {
            main: "#DF2040",
          },
          info: {
            main: "#33B3CC",
          },
          tableRows: {
            one: "#ddebd7",
            two: "#bcd6b0",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            light: "#8151c5",
            main: "#6b44a1",
            dark: "#56377f",
          },
          secondary: {
            light: "#2bab10",
            main: "#298615",
            dark: "#246315",
          },
          divider: "#e4f8db",
          text: {
            primary: {
              light: "#ffffff",
              main: "#ebe1f6",
              dark: "#d7c3ec",
            },
            secondary: {
              light: "#ffffff",
              main: "#e4f8db",
              dark: "#c8f1b7",
            },
          },
          background: {
            default: "#4e4e4e",
            paper: "#303030",
          },
          success: {
            main: "#40BF6A",
          },
          warning: {
            main: "#EBB513",
          },
          error: {
            main: "#ef5350",
          },
          info: {
            main: "#33B3CC",
          },
          tableRows: {
            one: "#111b0a",
            two: "#162e11",
          },
        }),
  },
  breakpoints: {
    values: {
      xs: 600,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default getDesignTokens;
