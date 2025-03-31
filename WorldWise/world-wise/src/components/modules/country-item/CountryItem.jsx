import ReactCountryFlag from "react-country-flag";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <ReactCountryFlag
        className={styles.emoji}
        countryCode={country.emoji}
        svg
      />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
