import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const navigate = useNavigate();
  const checkUser = () => {
    const user = JSON.parse(localStorage.getItem("user") || JSON.stringify("undefined"));
    if (!user || user === "undefined") {
      return navigate("/login");
    }
  };
  useEffect(() => {
    checkUser();
  }, [props.userInfo]);
  return (
    <React.Fragment>{props.userInfo ? props.children : null}</React.Fragment>
  );
};
export default ProtectedRoute;
