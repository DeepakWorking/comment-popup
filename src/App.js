import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/joy/Button";
import { useState } from "react";
import CommentsPopup from "./Components/CommentsPopup/CommentsPopup.js";

function App() {
  const [showModal, setShowModal] = useState(true);
  const closePopup = () => {
    setShowModal(false);
  };
  const openPopup = () => {
    setShowModal(true);
  };
  return (
    <div className="App">
      <Button onClick={openPopup} className="mainButton">
        Show Comments
      </Button>
      <CommentsPopup showPopup={showModal} closePopup={closePopup} />
    </div>
  );
}

export default App;
