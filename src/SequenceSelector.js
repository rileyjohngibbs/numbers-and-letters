import "./SequenceSelector.css";

const SequenceSelector = ({ sequence, sequenceKeys, setSequenceKeys }) => {
  const className = sequenceKeys.includes(sequence.key)
    ? "sequence-selector sequence-selector--selected"
    : "sequence-selector";
  const clickHandler = () => {
    if (sequenceKeys.includes(sequence.key)) {
      if (sequenceKeys.length > 1)
        setSequenceKeys(sequenceKeys.filter((key) => key !== sequence.key));
    } else {
      setSequenceKeys(sequenceKeys.concat(sequence.key));
    }
  };
  return (
    <div className={className} onClick={clickHandler}>
      {sequence.title}
    </div>
  );
};

export default SequenceSelector;
