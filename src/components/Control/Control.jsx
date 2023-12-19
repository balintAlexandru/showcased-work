import { useState } from "react";
import uuid from "react-uuid";

import "./ControlStyle.css";

const Control = ({ portfolioData, setPortfolioData }) => {
  const [currentAction, setCurrentAction] = useState("ADD");
  const [error, setError] = useState(false);
  const [entry, setEntry] = useState({
    id: 0,
    link: "",
    image: "",
    show: true,
  });

  const handleAction = (action) => {
    switch (action) {
      case "ADD":
        setCurrentAction("CREATE");
        break;
      case "CREATE":
        setPortfolioData([...portfolioData, { ...entry, id: uuid() }]);
        setEntry({
          id: 0,
          link: "",
          image: "",
          show: true,
        });
        setCurrentAction("ADD");
        break;
      case "EDIT":
        handleEdit(entry.id);
        setCurrentAction("ADD");
        break;
      default:
        break;
    }
  };

  const handleDelete = (id) => {
    setPortfolioData(portfolioData.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const editedEntry = portfolioData.find((item) => item.id === id);
    portfolioData[portfolioData.indexOf(editedEntry)] = entry;
  };

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (event) => {
          setEntry({ ...entry, image: event.target.result });
        };

        reader.readAsDataURL(file);
      } else {
        handleError();
      }
    }
  };

  return (
    <div className="control-wrapper">
      <h2>Portfolio CMS</h2>
      {currentAction === "ADD" && (
        <div className="list-wrapper list">
          {portfolioData.length === 0 && (
            <p className="info">
              <span className="human">🙋🏻‍♂️</span>
              <span>Look’s like you don’t have any showcased</span>
            </p>
          )}
          {portfolioData.length !== 0 && (
            <ol>
              {portfolioData?.map((data) => (
                <li>
                  <img src={data.image} alt="entryImg" />
                  <p>{data.link}</p>
                  <div className="entry-settings">
                    <span
                      onClick={() => {
                        setEntry({
                          id: data.id,
                          link: data.link,
                          image: data.image,
                          show: data.show,
                        });
                        setCurrentAction("EDIT");
                      }}
                    >
                      🖊️
                    </span>
                    <span>👀</span>
                    <span
                      onClick={() => {
                        handleDelete(data.id);
                      }}
                    >
                      🗑️
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
      {(currentAction === "CREATE" || currentAction === "EDIT") && (
        <div className="create-wrapper list">
          <div className="link-wrapper">
            <span>Link</span>
            <input
              type="text"
              value={entry.link}
              placeholder="Enter link url here"
              onChange={(event) =>
                setEntry({ ...entry, link: event.target.value })
              }
            />
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
          />
          <div className="image-wrapper">
            {entry.image !== "" && <img src={entry.image} alt="entry" />}
          </div>
        </div>
      )}
      <div className="btn-wrapper">
        <button
          onClick={() => {
            handleAction(currentAction);
          }}
          style={{
            backgroundColor:
              currentAction === "ADD" || currentAction === "CREATE"
                ? "#56a76d"
                : "#7d88ee",
          }}
        >
          {currentAction}
        </button>
        {currentAction !== "ADD" && (
          <span
            onClick={() => {
              setCurrentAction("ADD");
              setEntry({
                id: 0,
                link: "",
                image: "",
                show: true,
              });
            }}
          >
            Go back
          </span>
        )}
      </div>
      <div className="error-wrapper">{`${error ? "Invalid data!" : ""}`}</div>
    </div>
  );
};

export default Control;
