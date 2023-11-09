import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { APP_URLS } from "@routes";

import ResponsiveAppBar from "@organisms/ResponsiveAppBar";

const AdminLayout = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return navigate(APP_URLS.login);
    }
  }, [navigate, dispatch, token]);

  return (
    <div>
      <ResponsiveAppBar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
