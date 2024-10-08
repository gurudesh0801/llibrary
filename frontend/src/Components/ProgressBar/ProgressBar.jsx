import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

const ProgressBar = () => {
  const [progress, setProgress] = useState(100); // Start with 100% progress
  const [daysLeft, setDaysLeft] = useState(0); // Initialize days left state
  const [barColor, setBarColor] = useState("#4caf50"); // Default green color

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const totalDays = (endOfMonth - startOfMonth) / (1000 * 60 * 60 * 24);
      const elapsedDays = (now - startOfMonth) / (1000 * 60 * 60 * 24);
      const remainingDays = Math.ceil(totalDays - elapsedDays);
      const percentage = (remainingDays / totalDays) * 100;

      setProgress(percentage);
      setDaysLeft(remainingDays); // Update the days left

      // Update bar color based on days left
      if (remainingDays <= 3) {
        setBarColor("#f44336"); // Red color for 3 or fewer days
      } else if (remainingDays <= 5) {
        setBarColor("#ff9800"); // Orange color for 5 or fewer days
      } else if (remainingDays <= 10) {
        setBarColor("#ffeb3b"); // Yellow color for 10 or fewer days
      } else {
        setBarColor("#4caf50"); // Default green color
      }
    };

    updateProgress();

    const interval = setInterval(updateProgress, 24 * 60 * 60 * 1000); // Update every day

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{ width: `${progress}%`, backgroundColor: barColor }}
        ></div>
      </div>
      <p className="days-left-text">{daysLeft} days left to pay your fees.</p>{" "}
      {/* Display days left */}
    </div>
  );
};

export default ProgressBar;
