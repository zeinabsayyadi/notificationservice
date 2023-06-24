import { Collapse, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useEffect } from "react"

const Pricing = ()=>{
    const [pricing,setPricing] = useState(null)
    const openMenuCollaps = (id)=>{
    }
    useEffect(()=>{
        axios({
            method: "GET",
            url: admin_dashboard_get_owner_info,
            headers: {
              "x-access-token": token,
              "Content-Type": "application/json",
            },
            
          }).then((res)=>{
            console.log('res of userInfo',res);
            setPricing(res?.data?.data?.docs)
          }).catch((err)=>{
            console.log('err in owner info', err);
      
          })
    },[])
    return(
        pricing &&
        <List>
        {pricing.map((license)=>(
            <>
             <ListItem key={license._id}>
            <ListItemButton onClick={()=>console.log('listitem')}>
                <ListItemText>
                    {license.name}
                </ListItemText>
            </ListItemButton>
           </ListItem> 
           <Collapse id={license._id}  
                    in={openMenuCollaps(license._id)}
                      timeout="auto"
                      unmountOnExit
                    >

           </Collapse>
            </>
        ))}
        </List>
        
    )
   
}
export default Pricing