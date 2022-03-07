import React, { useState, useEffect, useRef } from 'react';
import { Timer } from './components/timer';

import wordList from './resources/words.json';

const MAX_TYPED_KEYS = 20;
const WORD_ANIMATION_INTERVAL = 100;
const SPECIAL_KEYS = [
                    "Backspace", 
                    "Alt", 
                    "Control", 
                    "Shift", 
                    "Enter", 
                    "CapsLock", 
                    "Tab", 
                    "Meta", 
                    "Escape",
                    "F1",
                    "F2",
                    "F3",
                    "F4",
                    "F5",
                    "F6",
                    "F7",
                    "F8",
                    "F9",
                    "F10",
                    "F11",
                    "F12",
                    "ContextMenu",
                    "Pause",
                    "Delete",
                    "Home",
                    "PageDown",
                    "PageUp",
                    "End",
                    "Insert",
                    "NumLock",
                    "ArrowLeft",
                    "ArrowRight",
                    "ArrowUp",
                    "ArrowDown"
                  ]

const getWord = () => {
  const index = Math.floor(Math.random() * wordList.length);
  const word = wordList[index];
  return word.toLowerCase();
}

const isValidKey = (key, word) => {
  if (!word) return false;

  const result = word.split('').includes(key);
  return result;
}

const Word = ({ word, validKeys }) => {

  if (!word) return null;

  const joinedKeys = validKeys.join('');
  const matched = word.slice(0, joinedKeys.length)
  const remainder = word.slice(joinedKeys.length)
  const matchedClass = (joinedKeys === word) ? 'matched completed' : 'matched'

  return (
    <>
      <span className={matchedClass}>{matched}</span>
      <span className="remainder">{remainder}</span>
    </>
  );
}

const App = () => {

  const [typedKeys, setTypedKeys] = useState([]);
  const [validKeys, setValidKeys] = useState([]);
  const [word, setWord] = useState("");
  const [completedWords, setCompletedWords] = useState([]);
  const containerRef = useRef(null);
  const [startTimer, setStartTimer] = useState(false)

  useEffect(() => {
    setWord(getWord());
    if (containerRef) containerRef.current.focus();
  }, [])

  useEffect(() => {
    const wordFromValidKeys = validKeys.join('').toLocaleLowerCase();

    let timeout = null;

    if (word && word === wordFromValidKeys) {
      setTimeout(() => {

        let newWord = null;
        do {
          newWord = getWord()
        } while (completedWords.includes(newWord));

        setWord(newWord);
        setValidKeys([]);
        setCompletedWords((prev) => [...prev, word])
      }, WORD_ANIMATION_INTERVAL)
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    }

  }, [word, validKeys, completedWords])

  const handleKeyDown = (e) => {

    if(!startTimer) setStartTimer(true)

    const { key } = e;
    if(!key === "F5"){
      e.preventDefault();
    }

    if (!SPECIAL_KEYS.includes(key)) {
      setTypedKeys((prev) => [...prev, key].slice(MAX_TYPED_KEYS * -1));
    }

    if (isValidKey(key, word)) {
      setValidKeys((prev) => {
        const isValidLength = prev.length <= word.length;
        const isNextChar = isValidLength && word[prev.length] === key;

        return (isNextChar) ? [...prev, key] : prev;
      })
    }

  }

  return (
    <div className="container" tabIndex="0" onKeyDown={handleKeyDown} ref={containerRef}>
      <Timer startTimer={startTimer}/>
      <div className="valid-keys">
        <Word word={word} validKeys={validKeys} />
      </div>
      <div className="typed-keys">{typedKeys ? typedKeys.join(' ') : null}</div>
      <div className="completed-words">
        <ol>
          {completedWords.map((word) => {
            return (<li key={word}>{word}</li>)
          })}
        </ol>
      </div>
      <span className="author">Maded with React by <a href="https://github.com/rnldourado">Raniel Dourado</a> - <a href="https://github.com/rnldourado/typing">GitHub</a></span>
    </div>
  )
}

export default App;
