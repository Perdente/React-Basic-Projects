import ReactCountryFlag from "react-country-flag";
import { formatDate } from "../../../util/formatDate";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../../../contexts/CitiesContext";

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities();

  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <ReactCountryFlag className={styles.emoji} countryCode={emoji} svg />
        <h4 className={styles.name}>{cityName}</h4>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
