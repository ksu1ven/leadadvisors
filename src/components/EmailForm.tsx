import arrowRight from "@assets/images/arrow-right.svg";
import { useState, useRef } from "react";
import { Popup } from "./Popup";

export const EmailForm = () => {
  const regexpEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailValid, setEmailValid] = useState({ state: true, message: "" });
  const [serverResponse, setServerResponse] = useState({
    state: "",
    message: "",
  });

  const checkValidationEmail = (value: string) => {
    if (value) {
      const isMatchRegexp = !!value.match(regexpEmail);
      setEmailValid({
        state: isMatchRegexp,
        message: isMatchRegexp ? "" : "Incorrect Email",
      });
    }
  };

  const resetValidationError = () => {
    setEmailValid({
      state: true,
      message: "",
    });
  };

  const closePopup = () => {
    setServerResponse({ state: "", message: "" });
  };

  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current?.value) {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status == 200) {
          setServerResponse({
            state: "SUCCESS!",
            message: "You have successfully subscribed to the email newsletter",
          });
        } else {
          setServerResponse({
            state: "ERROR",
            message: "Oops...Server error. Try again later",
          });
        }
      };

      xhr.onerror = () =>
        setServerResponse({
          state: "ERROR",
          message: "Oops...Server error. Try again later",
        });

      xhr.open(
        "POST",
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:3001" : ""
        }/api/user`
      );
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.setRequestHeader("Access-Control-Allow-Methods", "POST");
      xhr.send(emailRef.current.value);
    } else {
      setEmailValid({ state: false, message: "This is a required field" });
    }
  };

  return (
    <>
      <form
        action="submit"
        className="email-form"
        onSubmit={(e) => handleSubmitEmail(e)}
      >
        <div className="input-container">
          <input
            ref={emailRef}
            className="email-form__input"
            type="text"
            placeholder="Enter your Email and get notified"
            style={
              emailValid ? {} : { border: "2px solid var(--color-accent)" }
            }
            onChange={() => {
              resetValidationError();
            }}
            onBlur={(e) => checkValidationEmail(e.target.value)}
          />
          <p className="email-form__error">{emailValid.message}</p>
          <button
            type="submit"
            className="email-form__submit"
            disabled={!emailValid.state}
          >
            <img src={arrowRight} alt="submit" />
          </button>
        </div>
      </form>
      {serverResponse.state && (
        <Popup
          title={serverResponse.state}
          message={serverResponse.message}
          closePopup={closePopup}
        />
      )}
    </>
  );
};
