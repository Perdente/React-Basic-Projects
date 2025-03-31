// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../../hooks/useUrlPosition";
import ReactCountryFlag from "react-country-flag";
import Message from "../../modules/message/Message";
import Spinner from "../../ui/spinner/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../../contexts/CitiesContext";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading: isLoadingCities } = useCities();

  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [flag, setFlag] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    async function fetchCityData() {
      if (!lat && !lng) return;
      try {
        setLocationError("");
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) throw Error("That's not a valid location🙄");
        setCityName(data?.city || data?.locality || "Not Discovered");
        setFlag(data?.countryCode);
        setCountryName(data?.countryName);
        console.log(data);
      } catch (error) {
        setLocationError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country: countryName,
      emoji: flag,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  };

  if (isLoading) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking on the map 🗺️" />;

  if (locationError) return <Message message={locationError} />;

  return (
    <form
      className={`${styles.form} ${isLoadingCities ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <ReactCountryFlag className={styles.flag} countryCode={flag} svg />
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
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
    </form>
  );
}

export default Form;
