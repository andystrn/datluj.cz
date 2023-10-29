import React, { useEffect, useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import ModalDatluj from '../Modal';
import './style.css';
import { Link } from 'react-router-dom';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);

  return words[wordIndex];
};

const Stage = ({ limitTime }) => {
  const [wordSize, setWordSize] = useState(3);
  const [words, setWords] = useState([generateWord(wordSize), generateWord(wordSize), generateWord(wordSize)]);
  const [mistakes, setMistakes] = useState(0);
  const [actualMistakes, setActualMistake] = useState(0);
  const [time, setTime] = useState({ minutes: limitTime, seconds: 0 });
  const [writtenWords, setWrittenWords] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [staticticOfWords, setStatisticOfWords] = useState([]);

  const timeOutFunc = () => {
    if (time.minutes > 0 && time.seconds === 0) {
      setTime({ ...time, minutes: time.minutes - 1, seconds: 59 })
    } else if (time.minutes > 0 && time.seconds > 0) {
      setTime({ ...time, seconds: time.seconds - 1 })
    }
    else if (time.minutes === 0 && time.seconds > 0) {
      setTime({ ...time, seconds: time.seconds - 1 })
    } else {
      setShowModal(true)
    }
  }

  const handleFinish = () => {
    setWrittenWords((prev) => prev + 1);
    
    if (actualMistakes > 0) {
      setStatisticOfWords([...staticticOfWords, { word: words[0], mistakes: actualMistakes }]);
    }

    setActualMistake(0);

    if (writtenWords % 5 === 0) {
      setWords([...words.slice(1), generateWord(wordSize)]);
      setWordSize((prev) => prev + 1);
    } else {
      setWords([...words.slice(1), generateWord(wordSize)]);
    }

    if (wordSize > wordList.length) {
      setWordSize(3);
    }
  }

  const handleMistake = () => {
    setMistakes((prev) => prev + 1);
    setActualMistake((prev) => prev + 1);
  }

  const handleClose = () => {
    setShowModal(false);
    setTime({ minutes: limitTime, seconds: 0 });
    setWrittenWords(0);
    setMistakes(0);
    setActualMistake(0);
  }

  if (limitTime) {
    useEffect(() => {
      setTimeout(timeOutFunc, 1000)
    }, [time])
  }

  return (
    <>
      <h1 className='stage__h1 fw-bold text-center mb-5 mt-5'>Datluj všemi deseti</h1>
      <div className="stage">
        <div className='d-flex justify-content-around text-uppercase mt-4 mb-5'>
          <div className='d-flex align-items-center h5'>Slova: <span style={{ fontSize: '30px', marginLeft: '10px' }}> {writtenWords}</span></div>
          <div className={limitTime ? 'd-flex align-items-center h5 ' : 'd-none'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
              <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
              <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
            </svg>
            <span style={{ fontSize: '30px', marginLeft: '10px' }}> {time.minutes}:{time.seconds}</span>
          </div>
          <div className="d-flex align-items-center h5">Chyby:<span style={{ fontSize: '30px', marginLeft: '10px' }}> {mistakes}</span> </div>
        </div>
        <div className="stage__words mb-5">
          {words.filter((word, i) => i === 0).map((word, i) => <Wordbox word={word} key={word} onFinish={handleFinish} active={true} onMistake={handleMistake} modal={showModal} />)}
          {words.filter((word, i) => i !== 0).map((word, i) => <Wordbox word={word} key={word} onFinish={handleFinish} active={false} onMistake={handleMistake} modal={showModal} />)}
        </div>
        <div className='d-flex justify-content-end'>
          <Link style={{ width: '200px' }} to="/" className='navLink'>Ukončit hru</Link>
        </div>
        <ModalDatluj show={showModal} onClose={handleClose} words={writtenWords} mistakes={mistakes} statistic={staticticOfWords} timeLimit={limitTime} />
      </div>
    </>
  );
};

export default Stage;
