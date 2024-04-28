import crossIcon from "@assets/images/cross.svg";

interface PopupProps {
  title: string;
  message: string;
  closePopup: () => void;
}
export const Popup = ({ title, message, closePopup }: PopupProps) => {
  return (
    <div className="overlay" onClick={closePopup}>
      <div className="popup">
        <div className="popup_relative">
          <button type="button" className="popup__close" onClick={closePopup}>
            <img src={crossIcon} alt="close popup" />
          </button>
          <h3 className={`popup__title popup__title_${title.toLowerCase()}`}>
            {title}
          </h3>
          <p className="popup__message">{message}</p>
          <button
            type="button"
            className="button button_popup"
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
