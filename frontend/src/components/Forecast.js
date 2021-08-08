import React from "react";
import ReactWeather, { useOpenWeather } from "react-open-weather";

const Forecast = ({ label, lat, lon }) => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "395d470778bd90946e82b5859acd952d",
    lat: lat,
    lon: lon,
    lang: "en",
    unit: "metric",
  });

  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel={label}
      unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
      showForecast
    />
  );
};

export default Forecast;
