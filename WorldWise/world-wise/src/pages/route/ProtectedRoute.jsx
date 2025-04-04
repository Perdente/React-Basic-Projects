import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/FakeAuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return isAuthenticated && children;
};

export default ProtectedRoute;
