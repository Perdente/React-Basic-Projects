import { useCities } from "../../../contexts/CitiesContext";
import Spinner from "../../ui/spinner/Spinner";
import CountryItem from "../country-item/CountryItem";
import Message from "../message/Message";
import styles from "./CountryList.module.css";

const CountryList = ({ cityObj }) => {
  const { cities, isLoading } = useCities();

  if (!cities.length) return <Message message="Please Enter your country" />;

  const countries = cities?.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
