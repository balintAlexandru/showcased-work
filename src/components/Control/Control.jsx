import { useState } from "react";

import "./ControlStyle.css";

import {
  handleAction,
  handleDelete,
  handleError,
  handleHide,
  handleFileChange,
} from "../../helper/customFunctions";

import PropTypes from "prop-types";

const Control = ({
  portfolioData,
  setPortfolioData,
  showSettings,
  setShowSettings,
}) => {
  const [currentAction, setCurrentAction] = useState("ADD");
  const [error, setError] = useState(false);

  const [entry, setEntry] = useState({
    id: 0,
    link: "",
    image: "",
    show: true,
  });

  return (
    <>
      {!showSettings && (
        <span
          className="settings-icon"
          onClick={() => {
            setShowSettings(!showSettings);
          }}
        >
          🖥️
        </span>
      )}
      {showSettings && (
        <div className="control-wrapper">
          <span
            className="close-settings"
            onClick={() => {
              setShowSettings(!showSettings);
              setCurrentAction("ADD");
            }}
          >
            ❌
          </span>
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
                <ul>
                  {portfolioData?.map((data, index) => (
                    <li key={index}>
                      <img src={data.image} alt="entryImg" />
                      <p className="control-list-link">{data.link}</p>
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
                        <span
                          onClick={() => {
                            handleHide(
                              data.id,
                              setPortfolioData,
                              portfolioData
                            );
                          }}
                        >
                          {data?.show ? "👀" : "🙈"}
                        </span>
                        <span
                          onClick={() => {
                            handleDelete(
                              data.id,
                              setPortfolioData,
                              portfolioData
                            );
                          }}
                        >
                          🗑️
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
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
                onChange={(event) =>
                  handleFileChange(event, setEntry, entry, setError)
                }
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
                if (
                  (entry.link === "" || entry.image === "") &&
                  currentAction !== "ADD"
                ) {
                  handleError(setError);
                } else {
                  handleAction(
                    currentAction,
                    setCurrentAction,
                    portfolioData,
                    entry,
                    setEntry,
                    setPortfolioData
                  );
                }
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
          <div className="error-wrapper">{`${
            error ? "Invalid data!" : ""
          }`}</div>
        </div>
      )}
    </>
  );
};

Control.propTypes = {
  portfolioData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.string,
      link: PropTypes.string,
      show: PropTypes.bool,
    })
  ),
  setPortfolioData: PropTypes.func,
  showSettings: PropTypes.bool,
  setShowSettings: PropTypes.func,
};

export default Control;
