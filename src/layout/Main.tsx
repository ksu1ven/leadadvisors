import { Link } from "react-router-dom";
import { Counter } from "@components/Counter";
import arrorwRight from "@assets/images/arrow-right.svg";

export const Main = () => {
  return (
    <main className="main">
      <div className="construction appear appear_construction">
        <h2>Under Construction</h2>
        <p className="construction__p">
          We're making lots of improvements and will be back soon
        </p>
      </div>
      <Counter />
      <p className="appear appear_go-to-event">
        Check our event page when you wait:
      </p>
      <Link
        to="https://odyssey4165.vercel.app/"
        className="button button_link appear appear_go-to-event"
        target="_blank"
      >
        <span>Go to the event</span>
        <img src={arrorwRight} alt="follow link" />
      </Link>
    </main>
  );
};
