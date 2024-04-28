import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import hawaiiImg from "@assets/images/photo/hawaii.jpg";
import mafiaImg from "@assets/images/photo/mafia.jpg";
import houseImg from "@assets/images/photo/house.jpg";
import houseInsideImg from "@assets/images/photo/house-inside.jpg";
import forestImg from "@assets/images/photo/forest.jpg";
import beachImg from "@assets/images/photo/beach.jpg";

interface Events {
  name: string;
  img: string;
  date: string;
}

export const Events = () => {
  const [activeEvent, setEventActive] = useState(0);
  const [isAnimationNow, setIsAnimationNow] = useState(false);

  const accordionRef = useRef<HTMLDivElement>(null);

  const events: Events[] = [
    {
      name: "Hawaiian party",
      img: hawaiiImg,
      date: "13.02.2023",
    },
    { name: "Мafia party", img: mafiaImg, date: "15.05.2022" },
    { name: "Party", img: houseImg, date: "15.05.2022" },
    {
      name: "Party on the beach",
      img: beachImg,
      date: "23.07.2023",
    },
    {
      name: "Home Security",
      img: beachImg,
      date: "01.02.2022",
    },
    {
      name: "Network Design & Implementation",
      img: houseInsideImg,
      date: "29.03.2023",
    },
    {
      name: "System Design & Engineering",
      img: forestImg,
      date: "18.08.2021",
    },
    {
      name: "Client Care Plans",
      img: houseImg,
      date: "08.01.2024",
    },
  ];

  const changeSlide = (ind: number) => {
    if (accordionRef.current?.children) {
      const transitionClass =
        ind > activeEvent ? "translate-left" : "translate-right";
      const elementsToMove = [...accordionRef.current.children].filter(
        (_, index) =>
          (index > ind && index < activeEvent) ||
          (index < ind && index > activeEvent)
      );
      setIsAnimationNow(true);
      elementsToMove.forEach((el) =>
        el.classList.add(`${transitionClass}_no-visible`)
      );
      accordionRef.current.children[activeEvent]
        .querySelector(".blur")
        ?.classList.remove("blur_no-gradient");

      accordionRef.current.children[ind].classList.add(transitionClass);
      accordionRef.current?.children[ind]
        ?.querySelector(".blur")
        ?.classList.add("blur_no-gradient");

      if (
        (transitionClass === "translate-right" && window.innerWidth > 1024) ||
        (transitionClass === "translate-left" && window.innerWidth <= 1024)
      ) {
        accordionRef.current.children[activeEvent]
          ?.querySelector(".event-preview")
          ?.classList.add(`${transitionClass}_no-visible`);
      }

      setTimeout(() => {
        setEventActive(ind);
        setIsAnimationNow(false);
        accordionRef.current
          ?.querySelectorAll(`.${transitionClass}_no-visible`)
          .forEach((el) =>
            el.classList.remove(`${transitionClass}_no-visible`)
          );
        accordionRef.current?.children[ind].classList.remove(transitionClass);
      }, 1050);
    }
  };

  return (
    <section className="events">
      <h2>All events</h2>
      <div className="accordion" ref={accordionRef} id="events">
        {events.map((item, ind) => (
          <div
            key={item.name}
            className={
              ind === activeEvent ? "event event_active" : "event event_hidden"
            }
            onClick={() => {
              if (ind !== activeEvent && !isAnimationNow) changeSlide(ind);
            }}
          >
            <div className="event-preview">
              <div
                className={
                  ind === activeEvent ? "blur blur_no-gradient" : "blur"
                }
              >
                <h3 className="event-preview__name">{item.name}</h3>
                <h4 className="event-preview__count">{`0${ind + 1}`}</h4>
              </div>
              <img
                src={item.img}
                alt={item.name}
                className={`event-preview__img event-preview__img_${ind}`}
              />
            </div>

            <div className="event-main">
              <div className="event-content">
                <h4 className="event-content__num">{`0${ind + 1}`}</h4>
                <h3 className="event-content__name">{item.name}</h3>
                <p className="event-content__date">{item.date}</p>
                <Link
                  to="https://svarka-tyt-minsk.vercel.app/"
                  className="button-link_white-border"
                >
                  More information
                </Link>
              </div>
              <div className="event-main__img-container">
                <img src={item.img} alt={item.name} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
