import "./NotepadCardStyle.css";

import noteImage from "../../images/note.png";

const NotepadCard = ({ note, number }) => {
  console.log(note);
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
            Link: {note.link}
          </a>
        </div>
      </div>
      <div className="number-wrapper">{number}</div>
    </div>
  );
};

export default NotepadCard;
