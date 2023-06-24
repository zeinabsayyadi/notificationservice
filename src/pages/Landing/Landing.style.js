export const Style  =(theme)=>({
WrapperBox:{
    display:'flex',
    width:'100vw',
      hight:'100vh',
      alignItems:'center',
      justifyContent:'center',
    [theme.breakpoints.down("xs")]: {
        flexDirection:'column'
      },
      [theme.breakpoints.up("xs")]: {
        flexDirection:'row'
      },
},
innerBox:{
    [theme.breakpoints.down("xs")]: {
       height:'50vh',
       width:'100vw'
      },
      [theme.breakpoints.up("xs")]: {
        width:'50vw',
        height:'80vh'
      },
},
img:{
    display: 'block',
    overflow: 'hidden',
    [theme.breakpoints.down("xs")]: {
        height:'48vh',
        maxWidth:'100vw'
       },
       [theme.breakpoints.up("xs")]: {
         maxWidth:'50vw',
         height:'96vh'
       },
},
PaperBox:{
    backgroundColor: "transparent",
    overflowY: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor : 'rgba(242,242,242,0.45)',
    
    [theme.breakpoints.down("xs")]: {
        height:'50vh',
        width:'100vw'
       },
       [theme.breakpoints.up("xs")]: {
         width:'50vw',
         height:'100vh'
       },

},
Paper:{
  background: 'transparent',
   width:'100%',
   borderRadius:'0.5rem',
   padding:'1rem'
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
  button:{
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
})
