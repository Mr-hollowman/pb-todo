import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const navigate = useNavigate();
  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") {
      return navigate("/login");
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <React.Fragment>{props.userInfo ? props.children : null}</React.Fragment>
  );
};
export default ProtectedRoute;
