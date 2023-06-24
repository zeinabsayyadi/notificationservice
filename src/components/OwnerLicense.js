import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { admin_dashboard_get_owner_licenses } from "../api/admin"
import AdminOwnerProjectsTable from "./Tabels/AdminOwnerProjectsTable"

const OwnerLicenses = ()=>{
  const token = JSON.parse(localStorage.getITem('token'))
  const owner = JSON.parse(localStorage.getItem('currentOwner'))
    const [ownerLicenses,setOwnerLicenses] = useState(null)
    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(5)
    useEffect(()=>{
        axios({
            method: "POST",
            url: admin_dashboard_get_owner_licenses,
            headers: {
              "x-access-token": token,
              "Content-Type": "application/json",
            },
            data:{
                owner_id : owner._id
            }
          }).then((res)=>{
            console.log('res of userInfo',res);
            setOwnerLicenses(res?.data?.data?.docs)
          }).catch((err)=>{
            console.log('err in owner info', err)
          })
      },[])
    return(ownerLicenses &&  <AdminOwnerProjectsTable  licenses={ownerLicenses}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}/>)
    
    
}
export default OwnerLicenses