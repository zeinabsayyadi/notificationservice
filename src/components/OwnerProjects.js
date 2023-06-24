import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { admin_dashboard_get_owner_projects } from "../api/admin"
import AdminOwnerProjectsTable from "./Tabels/AdminOwnerProjectsTable"

const OwnerProjects = ({owner})=>{
    const [projects,setProjects] = useState(null)
    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(5)
    const token = JSON.parse(localStorage.getItem('token'))
    useEffect(()=>{
        axios({
            method: "POST",
            url: `${admin_dashboard_get_owner_projects}?page=${page}&limit=${rowsPerPage}`,
            headers: {
              "x-access-token": token,
              "Content-Type": "application/json",
            },
            data:{
                owner_id : owner._id
            }
          }).then((res)=>{
            console.log('res of userInfo',res);
            setProjects(res?.data?.data?.docs)
          }).catch((err)=>{
            console.log('err in owner info', err);
      
          })
    },[])
    return(projects &&  <AdminOwnerProjectsTable  projects={projects}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}/>)
    
    
}
export default OwnerProjects