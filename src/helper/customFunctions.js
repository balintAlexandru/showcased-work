import uuid from "react-uuid";

const handleDelete = (id, setPortfolioData, portfolioData) => {
  setPortfolioData(portfolioData.filter((item) => item.id !== id));
};

const handleError = (setError) => {
  setError(true);
  setTimeout(() => {
    setError(false);
  }, 2000);
};

const handleEdit = (id, setPortfolioData, portfolioData, entry) => {
  setPortfolioData(
    portfolioData.map((item) => {
      return item.id === id ? { ...entry } : { ...item };
    })
  );
};

const handleHide = (id, setPortfolioData, portfolioData) => {
  setPortfolioData(
    portfolioData.map((item) => {
      return item.id === id ? { ...item, show: !item.show } : { ...item };
    })
  );
};

const handleFileChange = (event, setEntry, entry, setError) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setEntry({ ...entry, image: event.target.result });
      };

      reader.readAsDataURL(file);
    } else {
      handleError(setError);
    }
  }
};

const handleAction = (
  action,
  setCurrentAction,
  portfolioData,
  entry,
  setEntry,
  setPortfolioData
) => {
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
      handleEdit(entry.id, setPortfolioData, portfolioData, entry);
      setEntry({
        id: 0,
        link: "",
        image: "",
        show: true,
      });
      setCurrentAction("ADD");
      break;
    default:
      break;
  }
};

export {
  handleAction,
  handleDelete,
  handleError,
  handleHide,
  handleFileChange,
};
