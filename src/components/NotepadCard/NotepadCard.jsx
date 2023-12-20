import "./NotepadCardStyle.css";

import noteImage from "../../images/note.png";

import PropTypes from "prop-types";

const NotepadCard = ({ note, number }) => {
  return (
    <div className="note-container">
      <img src={noteImage} alt="note" className="note-image" />
      <div className="note-content">
        <div className="note-image-wrapper">
          <img src={note.image} alt="note" className="current-image" />
          <a
            href={note.link}
            target="_blank"
            rel="noreferrer"
            className="note-link"
          >
            <p className="link-text">{note.link}</p>
          </a>
        </div>
      </div>
      <div className="number-wrapper">{number + 1}</div>
    </div>
  );
};

NotepadCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    show: PropTypes.bool,
  }),
  number: PropTypes.number,
};

export default NotepadCard;
