/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

// const Timer = (props) => {
//   const { sessionStart } = props;
//   const [tickrate] = useState(1000);
//   const [callDuration, setCallDuration] = useState("00:00");
//   // track and the interval and clear it when it's done being used
//   const [interval, setIntervalID] = useState(0);

//   // start timer
//   function startTimer() {
//     // reset the clock
//     setCallDuration("00:00");

//     // setInterval is asnychronous
//     const interval = setInterval(() => {
//       const durationMilliSec = getCallDuration();
//       const mins = Math.floor(durationMilliSec / 60);
//       const secs = durationMilliSec % 60;

//       const minsStr = mins < 10 ? `0${mins}` : mins.toString();
//       const secsStr = secs < 10 ? `0${secs}` : secs.toString();

//       setCallDuration(`${minsStr}:${secsStr}`);
//     }, tickrate);

//     setIntervalID(interval);

//     // clear when finished
//     return () => {
//       () => {
//         clearInterval(interval);
//         setIntervalID(0);
//       };
//     };
//   }

//   useEffect(() => {
//     // console.log('getCallDuration:',{callDuration, intervalID: interval, sessionStart});
//     if (sessionStart !== null && !interval) {
//       startTimer();
//     } else {
//       // clear interval
//       clearInterval(interval);
//       setIntervalID(0);
//     }
//   }, [sessionStart]);

//   function getCallDuration() {
//     const temp = moment().diff(sessionStart, "seconds");
//     return temp;
//   }

//   return <label>{callDuration}</label>;
// };

class Ticker {
  // be sure to clear interval when deleted
  constructor(func, ticks) {
    // track and the interval and clear it when it's done being used
    this.interval = 0;
    this.ticks = ticks;

    this.startTimer(func);
  }

  // start timer
  startTimer(func) {
    // setInterval is asnychronous
    this.interval = setInterval(() => {
      // console.log("=Tick:", this.tickrate);
      if (func) func();
      // clearInterval(this.interval);
      // this.interval = 0;
    }, this.ticks);

    // clear when finished
    // return () => {
    //   () => {
    //     clearInterval(this.interval);
    //     this.interval = 0;
    //   };
    // };
  }

  getTick = (reset = true) => {
    return false;
  };
}

export { /*Timer,*/ Ticker };
