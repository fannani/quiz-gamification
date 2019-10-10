import React, {useState, useEffect} from 'react';
import './App.css';
import data from "./data";
import love from './assets/images/love.png';

const ProgressInTracker = ({percentage}) => (
    <div style={{ transition : 'width 1s linear',width: `${percentage}%`, backgroundColor: "#93D333",height:'100%', borderRadius: "10px"}}>
    </div>
)

const Choice = ({value, selected, onClick}) => {
  return  (
      <div onClick={onClick} className={`choice ${selected ? 'selected' : ''}`}>
        {value}
      </div>
  )
}

const Lives = ({ value }) => {
  const loveImg = [];
  for (let i = 0; i < value; i++) {
    loveImg.push(<img style={{marginLeft : '3px'}} width="20px" key={i} src={love} />);
  }

  return <div className="lives" >{loveImg}</div>;
};

const Progress = ({value}) => (
    <div className="tracker">
      <ProgressInTracker percentage={value} />
    </div>
)

const Content = ({isStart, result, question, choice, answer, onClick, score = 0, title, onStart}) => {
  if(!isStart){
    return (
      <div className="content">
        <div className="scoreboard">
          <span className="title">{title}</span> <br/>
          <button className="btn" onClick={onStart}>Mulai</button>

        </div>
      </div>
    )
  }
  if(result){
    return (
      <div className="content">
        <div className="scoreboard">
          <span className="title">Quiz selesai</span> <br/>
          <span className="description">Score anda adalah : {score}</span>
        </div>
      </div>
    )
  }
  return (
      <div className="content">
        <div className="question">{question}</div>
        <div>
          { choice.map((value) => (
              <div>
                <Choice value={value} selected={value === answer} onClick={() => { onClick(value) }} />
              </div>
          ))}
        </div>
      </div>
  )
}

function App() {
  const [index,setIndex] = useState(0);
  const [lives, setLives] = useState(data.config.lives);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [answer, setAnswer] = useState("");
  const [info, setInfo] = useState('');
  const [progress, setProgress] = useState(100);
  const [gameover, setGameover] = useState(false);
  const [btnCaption, setBtnCaption] = useState("Periksa");
  const [answered, setAnswered] = useState("notyet");
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    if(gameover) {
      setResult(true);
      setBtnCaption("Main lagi")
      setAnswered('notyet');
      setInfo('');
      setResult(true);
    }
  }, [gameover]);

  useEffect(() => {
    if(result){
      setGameover(true);
    }
  }, [result])

  useEffect(() => {
    const second = 100/data.config.times;
    let interval;
    if(!gameover && isStart) {
      interval = setInterval(() => {
        setProgress(progress - second);
      }, 1000);
      if(progress <= -1){
        setGameover(true);
      }
    }
    return () => clearInterval(interval);
  }, [progress, isStart])

  useEffect(() => {
    if(lives <= 0){
      setGameover(true);
    }
  }, [lives])


  const playAgain = () => {
    setIndex(0);
    setGameover(false);
    setScore(0);
    setProgress(100);
    setBtnCaption("Periksa");
    setAnswered("notyet");
    setAnswer('');
    setResult(false);
    setLives(data.config.lives)
  }
  const nextQuestion = () => {
    if(index < data.quiz.length - 1) {
      setIndex(index + 1);
      setAnswered('notyet');
      setAnswer('');
      setInfo('');
      setBtnCaption("Periksa");
    } else {
      setBtnCaption("Main lagi")
      setAnswered('notyet');
      setInfo('');
      setResult(true);
    }
  }
  const check = () => {
    if(result === true){
      playAgain();
    } else if(answered === 'notyet'){
      if(answer === data.quiz[index].answer){
        setAnswered("true");
        setScore(score + data.quiz[index].score);
        setInfo("Kamu benar");
      } else {
        setAnswered("false");
        setLives(lives - 1);


        setInfo("Jawaban benar : "+data.quiz[index].answer);
      }
      setBtnCaption('Lanjut');
    } else {
      nextQuestion();
    }
  }
  return (
    <div className="App">
      <Progress value={progress}/>
      <div className="header">
        <Lives value={lives} />
        <div className="score" style={{marginLeft : '10px', paddingBottom : '5px'}}>score : {score}</div>
      </div>
      <Content isStart={isStart} onStart={() => {
        setIsStart(true);
      }} title={data.config.title} score={score} result={result} question={data.quiz[index].question} choice={data.quiz[index].choice} answer={answer} onClick={(value) => {
        if(answered === 'notyet') {
          setAnswer(value)
        }
      }} />
      <div className={`control ${answered === 'true' ? 'right-answer' : (answered === 'false'? 'wrong-answer' : '')}`}>
        {
          (() => {
            if(isStart){
              return (
                  <div className="inner">
                    <span className="info">{info}</span>
                    <span className="index">{index+1}/{data.quiz.length}</span>
                    <button className={`btn ${answered === 'false' ? 'red-btn' : ''}`} onClick={check}>{btnCaption}</button>
                  </div>
              )
            }
          })()
        }

      </div>
    </div>
  );
}

export default App;
