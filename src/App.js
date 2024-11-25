import "./App.css";
import React, { useEffect, useState, useRef } from "react";

const CountdownComponent = () => {

  const hoursInput = useRef(null);
  const minutesInput = useRef(null);
  const secondsInput = useRef(null);
  const intervalRef = useRef(null);

  const [hoursState, setHours] = useState(0);
  const [minutesState, setMinutes] = useState(0);
  const [secondsState, setSeconds] = useState(0);
  const [textState, setText] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const [isStartButtonVisible, setIsStartButtonVisible] = useState(true);
  const [isPauseButtonVisible, setIsPauseButtonVisible] = useState(false);
  const [isResetButtonVisible, setIsResetButtonVisible] = useState(true);

  useEffect(() => {
    console.log("states: ", {
      hours: hoursState,
      minutes: minutesState,
      seconds: secondsState,
      text: textState,
      isRunning: isRunning,
    });
  }, [hoursState, minutesState, secondsState, textState, isRunning]);


  useEffect(() => {
    if (isRunning) {

      intervalRef.current = setInterval(() => {

        if (secondsState === 0) { // 1:1:0
          setText("Seconds = 0.");

          if (minutesState > 0) { // 0:1:0
            setMinutes(minutesState - 1);
            setSeconds(59);

          } else if (hoursState > 0) {  // 1:0:0
            setHours(hoursState - 1);
            setMinutes(59);
            setSeconds(59);

          } else if (hoursState === 0 && minutesState === 0) {
            setText("Finished.");
            setIsRunning(false);
            return 0;
          }

        } else {
          setSeconds(secondsState - 1);
        }

      }, 1000);
    }

    return () => clearInterval(intervalRef.current);

  }, [isRunning, hoursState, minutesState, secondsState]);

  

  useEffect(() => {
    if (isRunning && (hoursState > 0 || minutesState > 0 || secondsState > 0)) {
      setText(`${String(hoursState).padStart(2, "0")}:${String(minutesState).padStart(2, "0")}:${String(secondsState).padStart(2, "0")}`);
    }

  }, [hoursState, minutesState, secondsState, isRunning])


  function handleStartClick() {
    const hours = parseInt(hoursInput.current.value) || 0;
    const minutes = parseInt(minutesInput.current.value) || 0;
    const seconds = parseInt(secondsInput.current.value) || 0;

    setIsStartButtonVisible(false);
    setIsPauseButtonVisible(true);
    setIsResetButtonVisible(true);

    if (hours === 0 && minutes === 0 && seconds === 0) {
      setText("Input missing.");
      return;
    }

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);

    setTimeout(() => {
      setIsRunning(true);
    }, 100);
  }


  function handlePauseClick() {
    setIsStartButtonVisible(true);
    setIsPauseButtonVisible(false);
    setIsResetButtonVisible(true);

    clearInterval(intervalRef.current);
    
  }

  function handleResetClick() {
    setIsStartButtonVisible(true);
    setIsPauseButtonVisible(false);
    setIsResetButtonVisible(true);

    console.log("hoursState_2:", hoursState);

    hoursInput.current.value = "";
    minutesInput.current.value = "";
    secondsInput.current.value = "";
    setHours(0);
    setMinutes(0);
    setSeconds(0);

    // clearInterval(intervalRef.cuurent);
  }

  return (
    <>
      <div className="countdown-container">
        <input ref={hoursInput} id="hours-input" className={`countdown-input ${isStartButtonVisible ? "visible" : "hidden"}`} type="number" placeholder="HH"></input>
        <input ref={minutesInput} id="minutes-input" className={`countdown-input ${isStartButtonVisible ? "visible" : "hidden"}`} type="number" placeholder="MM"></input>
        <input ref={secondsInput} id="seconds-input" className={`countdown-input ${isStartButtonVisible ? "visible" : "hidden"}`} type="number" placeholder="SS"></input>

        <p className="countdown">{textState}</p>

        {isStartButtonVisible && <button id="start-button" onClick={handleStartClick}>Start</button>}
        {isPauseButtonVisible && <button id="pause-button" onClick={handlePauseClick}>Pause</button>}
        <button id="reset-button" onClick={handleResetClick}>Reset</button>
      </div>
    </>
  );


};

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <CountdownComponent />
      </header>
    </div>
  );
}

export default App;
