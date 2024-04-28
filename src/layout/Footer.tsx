import arrowRight from "@assets/images/arrow-right.svg";
import { EmailForm } from "@components/EmailForm";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content wrapper">
        <EmailForm />
        <a href="#events" className="footer__link">
          Other events
          <img src={arrowRight} alt="other events link" />
        </a>
      </div>
    </footer>
  );
};
