import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sign, userSelector } from "../../Redux/features/UserSlice";
import Error from "../Error";
import Landing from "../Landing";
import AdminPanel from "./AdminPanel";
import OwnerPanel from "./OwnerPanel";

const Panel = () => {
  const dispatch = useDispatch();
  const savedToken = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    let url = window.location;
    let token = new URLSearchParams(url.search).get("token");
    console.log("token here", token);
    if (token !== null && token !== undefined) {
      dispatch(
        sign({
          type: "owner",
          token: token,
          access_key: "",
          license_key: "",
        })
      );
      localStorage.setItem("token", JSON.stringify(token));
    } else if (savedToken !== null && savedToken !== undefined) {
      dispatch(
        sign({
          type: "owner",
          token: savedToken,
          access_key: "",
          license_key: "",
        })
      );
    }
  }, []);
  const { token, type } = useSelector(userSelector);
  console.log("in the panel ", token);
  return (
    <>
      {type === "admin" && token ? (
        <AdminPanel />
      ) : type === "owner" && token ? (
        <OwnerPanel />
      ) : (
        <Landing />
      )}
    </>
  );
};
export default Panel;
