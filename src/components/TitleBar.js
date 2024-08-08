import React, { useState, useEffect } from "react";
import { IoMdArrowForward } from "react-icons/io";
import "./TitleBar.css"

const MyComponent = () => {
  const [displayText, setDisplayText] = useState("Stay tuned launching soon");

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prevText) =>
        prevText === "Stay tuned launching soon"
          ? "Free delivery above 4000/- shopping"
          : "Stay tuned launching soon"
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black z-30 py-2 text-white text-center flex justify-center items-center">
      <p className={`text-sm animate-fade ${displayText === "Stay tuned launching soon" ? "fadeIn" : "fadeOut"}`}>
        {displayText}
      </p>
      <IoMdArrowForward className="ml-2" />
    </div>
  );
};

export default MyComponent;
