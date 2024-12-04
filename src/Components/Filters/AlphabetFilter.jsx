import React, { useState } from "react";
import { getDataFromQueryParam } from "../../utils/getDataFromQueryParam";

const AlphabetFilter = ({ onSelect }) => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const alphabetParams = getDataFromQueryParam("alphabet");
  const [activeLetter, setActiveLetter] = useState(alphabetParams || null);

  const handleSelect = (letter) => {
    if (activeLetter === letter) {
      setActiveLetter(null);
      onSelect(null);
    } else {
      setActiveLetter(letter);
      onSelect(letter);
    }
  };

  return (
    <div className="alphabet-filter flex flex-wrap justify-start gap-2 px-4">
      {alphabets.map((letter) => (
        <button
          key={letter}
          onClick={() => handleSelect(letter)}
          className={`px-2 py-1 border rounded text-xs md:text-xs font-medium transition-all duration-200 ${
            activeLetter === letter
              ? "bg-blue-950 text-white"
              : "hover:bg-blue-950 hover:text-white"
          } focus:outline-none `}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetFilter;
