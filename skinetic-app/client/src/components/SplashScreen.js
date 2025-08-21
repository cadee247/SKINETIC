import React, { useState, useEffect } from "react";
import "./splashscreen.css";


const SplashScreen = ({ onFinish }) => {
  const text = "Skinetic"; // ✅ make sure this is spelled correctly
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setTimeout(onFinish, 1000); // optional: proceed to app after 1s
      }
    }, 200); // typing speed in ms

    return () => clearInterval(interval);
  }, [onFinish, text]);

  return (
    <div className="splash-screen">
      <h1>{displayedText}</h1>
    </div>
  );
};

export default SplashScreen;
