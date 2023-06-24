import { useEffect } from "react";

const SingleNotify = () => {
  let url = window.location;
  console.log("widows url in singl projet ", url.search);
  let eventId = new URLSearchParams(url.search).get("event");
  // useEffect(()=>{

  // },)
  return null;
};
export default SingleNotify;
