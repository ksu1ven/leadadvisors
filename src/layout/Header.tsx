import { Link } from "react-router-dom";
import logo from "@assets/images/logo.svg";
import vectorLeft from "@assets/images/vector-left.svg";
import vectorLeftTablet from "@assets/images/vector-left-tablet.svg";
import vectorLeftMobile from "@assets/images/vector-left-mobile.svg";
import vectorRight from "@assets/images/vector-right.svg";
import vectorRightMobile from "@assets/images/vector-right-mobile.svg";

export const Header = () => {
  const vectorLeftSrc =
    window.innerWidth >= 1920
      ? vectorLeft
      : innerWidth <= 576
      ? vectorLeftMobile
      : vectorLeftTablet;

  const vectorRightSrc =
    window.innerWidth > 576 ? vectorRight : vectorRightMobile;

  return (
    <header className="header">
      <Link to="/" className="logo appear">
        <img src={logo} alt="Lead Advisors Logo" />
      </Link>
      <img
        src={vectorLeftSrc}
        alt="greeting decoration left"
        className="header__left appear appear_vectors"
      />
      <img
        src={vectorRightSrc}
        alt="greeting decoration left"
        className="header__right appear appear_vectors"
      />
    </header>
  );
};
