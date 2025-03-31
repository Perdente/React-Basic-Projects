/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useCities } from "../../../contexts/CitiesContext";
import Spinner from "../../ui/spinner/Spinner";
import CityItem from "../city-item/CityItem";
import Message from "../message/Message";
import styles from "./CityList.module.css";

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (!cities.length) return <Message message="Please Enter your country" />;

  return isLoading ? (
    <Spinner />
  ) : (
    <ul className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

export default CityList;
