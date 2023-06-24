import { Box, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import  PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import axios from "axios";
import { admin_dashboard_get_owner_info } from "../api/admin";
const OwnerProfile = ({owner})=>{
  const token = JSON.parse(localStorage.getItem('token'))
    const[ownerInfo,setOwnerInfo] = useState(null)
    useEffect(()=>{
        axios({
            method: "POST",
            url: admin_dashboard_get_owner_info,
            headers: {
              "x-access-token": token,
              "Content-Type": "application/json",
            },
            data: {
              owner_id: owner._id,
            },
          }).then((res)=>{
            console.log('res of userInfo',res);
            setOwnerInfo(res?.data?.data?.docs)
          }).catch((err)=>{
            console.log('err in owner info', err);
      
          })
    },[])
    return (
        <Box>
            <Box sx={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-around'
            }}>
                <IconButton>
                    <PersonOutlineRoundedIcon/>
                    {ownerInfo.name}
                </IconButton>
                {ownerInfo._id}
            </Box>
            <Box>
                <Typography>
                    other details
                </Typography>
            </Box>
        </Box>
    )
}
export default OwnerProfile