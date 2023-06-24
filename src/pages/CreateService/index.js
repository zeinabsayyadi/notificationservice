import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { admin_dashboard_get_all_services } from "../../api/admin";
import CreateServiceForm from "../../components/forms/admin/CreateServiceForm";
import { userSelector } from "../../Redux/features/UserSlice";

const CreateService = () => {
  const { token } = useSelector(userSelector);
  const [servicesList, setServicesList] = useState([]);
  useEffect(() => {
    axios
      .get(`${admin_dashboard_get_all_services}`, {
        headers: {
          "Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setServicesList(res?.data?.data);
      })
      .catch((err) => console.log("err", err));
  }, []);
  return <CreateServiceForm servicesList={servicesList} />;
};
export default CreateService;
