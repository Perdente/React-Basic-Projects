import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../../contexts/CitiesContext";
import { useEffect } from "react";
import { formatDate } from "../../../util/formatDate";
import ReactCountryFlag from "react-country-flag";
import Spinner from "../../ui/spinner/Spinner";
import Button from "../../ui/button/Button";

function City() {
  const navigate = useNavigate();
  const { id } = useParams(); // takes parameters from the URL

  const { getCity, currentCity, isLoading } = useCities();

  const { cityName, emoji, date, notes } = currentCity;

  useEffect(() => {
    getCity(id);
  }, [id]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <ReactCountryFlag className={styles.emoji} countryCode={emoji} svg />{" "}
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              `https://en.wikipedia.org/wiki/${cityName}`,
              "_blank",
              "noopener,noreferrer,width=800,height=600"
            );
          }}
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
