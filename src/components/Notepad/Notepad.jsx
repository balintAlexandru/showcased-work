import "./NotepadStyle.css";
import mainNotepad from "../../images/mainNotepad.png";
import NotePadCard from "../NotepadCard/NotepadCard";

import PropTypes from "prop-types";

const Notepad = ({ portfolioData, showSettings }) => {
  return (
    <div>
      <div className="notepad-wrapper">
        <img src={mainNotepad} alt="main-note" className="main-note" />
        <div className="note-list-wrapper">
          {!showSettings && portfolioData.length === 0 && (
            <p className="notepad-info">
              Click on the computer located in top right corner and add
              showcased.
            </p>
          )}
          {portfolioData?.map(
            (data, index) =>
              data.show && (
                <NotePadCard note={data} number={index} key={index} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

Notepad.propTypes = {
  portfolioData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.string,
      link: PropTypes.string,
      show: PropTypes.bool,
    })
  ),
  showSettings: PropTypes.bool,
};

export default Notepad;
