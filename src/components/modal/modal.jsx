import { useState } from "react";
import React from "react";
import Modal from "@material-ui/core/Modal";


export default function BasicModal({ score, result, questionNumber, setModalView =( )=>{} }) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setModalView(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  function percentage(result , questionNumber) {
    return (result / questionNumber) * 100;
  }
  const ans = percentage(result , questionNumber).toFixed(2)
  return (
    <div
      style={{
        textAlign: "center",
        display: "block",
        padding: 30,
        margin: "auto",
      }}
    >
      <Modal
        onClose={handleClose}
        open={open}
        style={{
          position: "absolute",
          border: "2px solid #000",
          backgroundColor: "lightgray",
          boxShadow: "2px solid black",
          height: 150,
          width: 240,
          margin: "auto",
          padding: "2%",
          color: "white",
        }}
      >
        <>
          <h2>{ans}</h2>
          {parseInt(ans) > 32 ? `Congratulation you have Passed your score is ${ans}`: "Sorry you are failed, Better luck next Time"}
        </>
      </Modal>
    </div>
  );
}
