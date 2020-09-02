import React, { useState, useEffect } from 'react';
import cards from './cards';
import './App.css';

function App() {

  const [instance, setInstance] = useState(shuffle(cards));
  const [tallyLeft, setTallyLeft] = useState(0);
  const [tallyRight, setTallyRight] = useState(0);
  const [acesHigh, setAcesHigh] = useState(Math.floor(Math.random()*2));

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(()=>{
    setLeft(instance.slice(0,26));
    setRight(instance.slice(26));
    setTallyLeft(0);
    setTallyRight(0);
  },[instance])


  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }


  return (
    <div className="App">
      {`Left: ${tallyLeft}, Right: ${tallyRight}`}
      <br/>
      {`Aces ${acesHigh ? 'high' : 'low'}!`}
      <br/>
      <button onClick={()=>{
        if (!left.length) {
          alert(`Game Over: Left: ${tallyLeft}, Right: ${tallyRight}`);
          return;}
        let lScore = (left[0][1] === 1) && acesHigh ? 14 : left[0][1];
        let rScore = (right[0][1] === 1) && acesHigh ? 14 : right[0][1];
        if (lScore >= rScore) setTallyLeft(tallyLeft + 1);
        if (lScore <= rScore) setTallyRight(tallyRight + 1);
        setLeft(left.slice(1));
        setRight(right.slice(1));
      }}>
        Click to score round!
      </button>
      <br/>
      <img src={left.length && left[0][0]} alt="Deck Left " />
      <img src={right.length && right[0][0]} alt="Deck Right" />
      <br/>
      <button onClick={()=>{
        setInstance(shuffle(cards));
        setLeft(instance.slice(0,26));
        setRight(instance.slice(26));
        setTallyLeft(0);
        setTallyRight(0);
        setAcesHigh(Math.floor(Math.random()*2));
      }}>Restart Game</button>
    </div>
  );
}

export default App;
