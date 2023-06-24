const Style = (theme) => ({
  listWrapper: {
    backgroundColor: "transparent",
    overflow: "auto",
    position: "absolute",
    paddingTop: "100px",
  },
  listButton: {
    "& div": {
      "& span": {
        color: theme.palette.text.primary.main,
      },
      "& svg": {
        color: theme.palette.text.primary.main,
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
      "& div": {
        "& span": {
          color: theme.palette.secondary.main,
        },
        "& svg": {
          color: theme.palette.secondary.main,
        },
      },
    },
  },
  listItem: {
    "& li": {
      textDecoration: "none",
      "& span": {
        textDecoration: "none",
      },
    },
  },
});
export default Style;
