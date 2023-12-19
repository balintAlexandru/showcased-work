import "./NotepadStyle.css";
import mainNotepad from "../../images/mainNotepad.png";
import NotePadCard from "../NotepadCard/NotepadCard";

const Notepad = ({ portfolioData }) => {
  console.log(portfolioData);
  return (
    <div>
      <div className="notepad-wrapper">
        <img src={mainNotepad} alt="main-note" className="main-note" />
        <div className="note-list-wrapper">
          {portfolioData?.map(
            (data, index) =>
              data.show && <NotePadCard note={data} number={index} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Notepad;
