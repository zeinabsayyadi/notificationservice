export const TableStyle = (theme) => ({
  TableBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "100vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(100vw - 240px)",
    },
  },
});
