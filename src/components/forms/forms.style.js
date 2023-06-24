export const Style = (theme) => ({
  formBox: {
    backgroundColor: "transparent",
    overflowY: "hidden",
    position: "relative",
    marginY: "3rem",
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
  formPaper: {
    marginY: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "32px",
  },
  Paper:{
      background: 'transparent',
       width:'100%',
       borderRadius:'0.5rem',
       padding:'1rem'
  },
  topTypo:{
    display :'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:"3rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "160px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "160px",
    },
    [theme.breakpoints.up("md")]: {
      width: "255px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "335px",
    },
  },
  inputField: {
    hight: "48px",
    marginY: "16px",
    color: theme.palette.text.primary.dark,
    "& label.Mui-focused": {
      color: theme.palette.text.secondary.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.text.secondary.main,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        padding: "4px",
        borderRadius: "8px",
        borderWidth: "1px",
        borderColor: '#247860',
       
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor:'#247860',
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "160px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "160px",
    },
    [theme.breakpoints.up("md")]: {
      width: "255px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "335px",
    },
  },
  formControl: {
    "& label": {
      color: theme.palette.text.primary.main,
    },
    "& label.Mui-focused": {
      color: theme.palette.text.secondary.main,
    },
    [theme.breakpoints.down("sm")]: {
      width: "160px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "160px",
    },
    [theme.breakpoints.up("md")]: {
      width: "255px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "335px",
    },
    marginY: "16px",
  },
  selsectField: {
    minHight: "48px",
    borderRadius: "8px",
    color: theme.palette.text.primary.main,
    " .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.light,
      borderWidth: "1px",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.dark,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.dark,
    },
    "	.MuiSelect-select": {
      color: theme.palette.text.primary.main,
      display: "flex",
      flexDirection: "row",

      "& svg": {
        display: "none",
      },
    },
  },

  formButton: {
    minWidth: "max-content",
    marginY: "16px",
    backgroundColor: '#247860',
    color: '#FAE6C9',
    fontSize: "14px",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    [theme.breakpoints.down("md")]: {
      width: "104px",
      hight: "28px",
      borderRadius: "8px",
      padding: "12px",
    },
    [theme.breakpoints.up("md")]: {
      width: "176px",
      hight: "44px",
      borderRadius: "8px",
      padding: "16px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "160px",
      hight: "40px",
      borderRadius: "8px",
      padding: "16px",
    },
  }
});
