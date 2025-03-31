import styles from "../sidebar/Sidebar.module.css";
import Logo from "../logo/Logo";
import AppNav from "../../modules/app-nav/AppNav";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Sidebar;
