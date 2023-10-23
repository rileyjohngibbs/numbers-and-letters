import { useState, useEffect } from "react";

import SequenceFinisher from "./SequenceFinisher";
import sequences from "./sequences.json";

function App() {
  const [sequenceRound, setSequenceRound] = useState({
    sequence: [],
    index: 0,
    wrongs: [],
  });

  useEffect(() => {
    setSequenceRound(generateSequenceRound());
  }, []);

  return (
    <div className="App">
      <SequenceFinisher
        sequence={sequenceRound.sequence}
        index={sequenceRound.index}
        wrongs={sequenceRound.wrongs}
        endCallback={() => setSequenceRound(generateSequenceRound())}
      />
    </div>
  );
}

const generateSequenceRound = () => {
  const source = sequences.upperLetters.sequence;
  const absIndex = Math.floor(Math.random() * source.length);

  const sequenceOptions = [
    [absIndex, absIndex + 2],
    [absIndex - 1, absIndex + 1],
    [absIndex - 2, absIndex],
  ].filter(([left, right]) => left >= 0 && right < source.length);
  console.log([absIndex, sequenceOptions]);
  const [left, right] =
    sequenceOptions[Math.floor(Math.random() * sequenceOptions.length)];
  const sequence = source.slice(left, right + 1);

  const index = absIndex - left;
  const leftovers = source.filter((_, i) => i < left || i > right);
  const wrongs = [];
  while (wrongs.length < 3) {
    wrongs.push(
      leftovers.splice(Math.floor(Math.random() * leftovers.length), 1)
    );
  }
  return { sequence, index, wrongs };
};

export default App;
