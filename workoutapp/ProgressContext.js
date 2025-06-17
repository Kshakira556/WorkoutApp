import React, { createContext, useState, useContext } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progressData, setProgressData] = useState({
    Monday: 60,
    Tuesday: 40,
    Wednesday: 80,
    Thursday: 20,
    Friday: 0,
    Saturday: 100,
    Sunday: 0,
  });

  const updateProgress = (day, progress) => {
    setProgressData((prevData) => ({
      ...prevData,
      [day]: progress,
    }));
  };

  return (
    <ProgressContext.Provider value={{ progressData, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);

export default ProgressContext;
