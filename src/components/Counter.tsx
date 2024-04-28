import { useState, useEffect } from "react";

export const Counter = () => {
  const timeUnits = ["Days", "Hours", "Minutes", "Seconds"];
  const timeUnitsTablet = ["DD", "HH", "MM", "SS"];
  const endDate = new Date(2024, 6, 24).getTime();
  const [timeRest, setTimeRest] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const stringifyWithZero = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  useEffect(() => {
    setInterval(() => {
      const dateNow = new Date();
      const diff = endDate - dateNow.getTime();
      let seconds = Math.ceil((diff / 1000) % 60);
      let minutes = Math.ceil((diff / (1000 * 60)) % 60);
      let hours = Math.ceil((diff / (1000 * 60 * 60)) % 24);
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      setTimeRest({
        days: stringifyWithZero(days),
        hours: stringifyWithZero(hours),
        minutes: stringifyWithZero(minutes),
        seconds: stringifyWithZero(seconds),
      });
    }, 1000);
  }, [endDate]);

  return (
    <div className="counter appear appear_counter">
      <h3 className="counter__number">
        <span>{timeRest.days}</span> : <span>{timeRest.hours}</span> :{" "}
        <span>{timeRest.minutes}</span> : <span>{timeRest.seconds}</span>
      </h3>
      <div className="counter__units">
        {(window.innerWidth > 768 ? timeUnits : timeUnitsTablet).map((unit) => (
          <h5 key={unit} className="counter__unit">
            {unit}
          </h5>
        ))}
      </div>
    </div>
  );
};
