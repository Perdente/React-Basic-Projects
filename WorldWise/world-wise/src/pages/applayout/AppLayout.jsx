import Map from "../../components/modules/map/Map";
import User from "../../components/modules/user/User";
import Sidebar from "../../components/ui/sidebar/Sidebar";
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
};

export default AppLayout;
