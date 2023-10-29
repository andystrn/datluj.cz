import React, { useEffect, useState } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish, active, onMistake, modal }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false);

  const handleKeyUp = (e) => {
    if ((e.key === lettersLeft[0]) && lettersLeft.length > 1) {
      setLettersLeft((prev) => prev.slice(1));
      setMistake(false)
    } else if ((e.key === lettersLeft[0]) && lettersLeft.length === 1) {
      onFinish();
      setMistake(false)
    } else {
      setMistake(true);
      onMistake();
    }
  }

  useEffect(() => {
    if (active && !modal) {
      document.addEventListener('keyup', handleKeyUp);
      return () => document.removeEventListener('keyup', handleKeyUp);
    }
  }, [lettersLeft, active, onMistake]);

  return (
    <div className={`wordbox ${mistake ? 'wordbox--mistake' : null}`}>{lettersLeft}</div>
  );
};

export default Wordbox;
