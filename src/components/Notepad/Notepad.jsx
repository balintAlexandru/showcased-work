import "./NotepadStyle.css";
import mainNotepad from "../../images/mainNotepad.png";

const Notepad = () => {
  return (
    <div className="notepad-wrapper">
      <img src={mainNotepad} alt="" />
    </div>
  );
};

export default Notepad;
