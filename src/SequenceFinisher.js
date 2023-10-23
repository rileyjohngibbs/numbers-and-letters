import { useState, useEffect } from "react";

import "./SequenceFinisher.css";

const SequenceFinisher = ({ sequence, index, wrongs, endCallback }) => {
  const [guessed, setGuessed] = useState(new Set());
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const choices = sequence.filter((_, i) => i === index).concat(wrongs);
    shuffleArray(choices);
    setChoices(choices);
    setGuessed(new Set());
  }, [sequence, index, wrongs]);

  const guessedCorrect = () => {
    for (let guess of guessed) {
      if (choices[guess] === sequence[index]) {
        return true;
      }
    }
    return false;
  };

  const choicesItemClassName = (itemIndex) => {
    const root = "choices-item";
    if (guessed.has(itemIndex)) {
      const mod = choices[itemIndex] === sequence[index] ? "correct" : "wrong";
      return `${root} ${root}--${mod}`;
    }
    return root;
  };

  const guessItem = (itemIndex) => {
    if (guessed.has(itemIndex)) {
      return;
    }
    setGuessed(new Set(guessed.add(itemIndex)));
  };

  return (
    <div>
      <div className="sequence">
        {sequence.map((item, i) => (
          <div key={i} className="sequence-item">
            {i === index && !guessedCorrect() ? "_" : item}
          </div>
        ))}
      </div>
      <div className="choices">
        {choices.map((item, i) => (
          <div
            key={i}
            className={choicesItemClassName(i)}
            onClick={() => guessItem(i)}
          >
            {item}
          </div>
        ))}
      </div>
      {guessedCorrect() ? <NextArrow clickHandler={endCallback} /> : ""}
    </div>
  );
};

const NextArrow = ({ clickHandler }) => (
  <div className="next-arrow-container" onClick={() => clickHandler()}>
    <svg className="next-arrow" viewBox="0 0 60 30">
      <polygon points="0,10 48,12 45,0 60,15 45,30 48,18 0,20" fill="black" />
    </svg>
  </div>
);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export default SequenceFinisher;
