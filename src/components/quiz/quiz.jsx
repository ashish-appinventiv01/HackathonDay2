import React, { useState } from "react";
import arrayShuffle from "array-shuffle";
import Select from "react-select";
import '../styling/style.css'
import BasicModal from "../modal/modal";

const Perform = (num1, num2, operation) => {
  if (operation == "+") {
    return num1 + num2;
  }
  if (operation == "-") {
    return num1 - num2;
  }
  if (operation == "*") {
    return num1 * num2;
  }
  if (operation == "/") {
    return num2 != 0 ? num1 / num2 : null;
  }
};

const createQuestionAnswer = (count) => {
  const operations = ["+", "-", "*", "/"];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  const num1 = Math.floor(Math.random() * count);
  const num2 = Math.floor(Math.random() * count);
  const answer = Perform(num1, num2, operation);

  const options = new Array();
  options.push({ value: "Correct", label: answer });
  while (options.length < 4) {
    const otherOption = Math.floor(Math.random() * count*count);
    if (!options.includes(otherOption)) {
      options.push({ value: "wrong", label: otherOption });
    }
  }

  const shuffleOptions = arrayShuffle(options);
  // console.log("?????????????????????????????", shuffleOptions, options)

  return {
    num1,
    num2,
    operation,
    answer,
    options: shuffleOptions,
  };
};

const Quiz = ({ levelType, count }) => {
  const [totalCheck, setTotalCheck] = useState(1)
  const [level, setLevel] = useState(levelType);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(0);
  const [disableButton,isDisabledButton] = useState(true)
  const [modalview, setModalView] = useState(false)

  console.log("zgdfxkjlhi;ojlkxfdzxgchj", count);

  const handleClick = () => {
    const newQuestions = [];
    for (let i = 0; i < questionNumber; i++) {
      newQuestions.push(createQuestionAnswer(count));
    }
    setQuestions(newQuestions);
  };
  const handleSubmission = (e) => {

    console.log(">>>>>>>>>..", JSON.parse(localStorage.getItem('items')))
    e.value == "Correct" ? setResult(result + 1) : null;
    setTotalCheck(totalCheck+1);
    totalCheck == parseInt(questionNumber) ? isDisabledButton(false) : isDisabledButton(true);

    
  };
  const handleSubmitTest = () =>{
    setModalView(true);
    isDisabledButton(false);
  }
  {modalview && <BasicModal score={modalview} result ={result} questionNumber={questionNumber} setModalView={setModalView}/>}
  return (
    <div>
      <h2>You have selected {levelType} level</h2>
      <h4>Type the number of questions </h4>
      <div className="inputfield-button">
      <input
        className="input-field"
        type="number"
        onChange={(e) => {
          const value = e.target.value;
          setQuestionNumber(value);
          setIsDisabled(value > count);
        }}
      />
      <button className="generated-button" disabled={isDisabled} onClick={handleClick}>
        Generated
      </button>
      </div>
     
        {modalview &&  <BasicModal modalview={modalview} result={result} questionNumber={questionNumber} setModalView={setModalView}/>}

      {isDisabled && questionNumber > count ? <p>Please enter a number less than {count}.</p>: <p>Please Mark all the options</p>}
        
      <div>
        <ul>
          {questions.map((question, id) => (
            <li>
              <p>
                Question {id + 1}: What is {question.num1} {question.operation}
                {question.num2}?
              </p>
              {/* {console.log(question.options, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>.")} */}
              <Select
                onChange={(e) => handleSubmission(e)}
                options={question.options}
              ></Select>
            </li>
          ))}
        </ul>
      </div>
      <button className="generated-button" onClick={handleSubmitTest} disabled={disableButton}>Submit your answer</button>
    </div>
  );
};

export default Quiz;
