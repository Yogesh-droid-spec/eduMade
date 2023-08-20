import React , { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
//import {db,auth} from './firebase'
//import { collection, doc, getDoc, onSnapshot, getDocs,setDoc } from "firebase/firestore";
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import bg from './lecture.jpg'
import './index.css'

//import { useCountdown } from './useCountdown';

class Question{
    constructor(desc,option1,option2,option3,option4,answer){
      this.desc = desc;
      this.option1 = option1;
      this.option2 = option2;
      this.option3 = option3;
      this.option4 = option4;
      this.answer = answer;
    }
}




function Quiz() {
    let {id} = useParams(); // quiz id
    const [open, setOpen] = React.useState(false);
    const [startQuiz,setStartQuiz] = React.useState(false);
    const navigate = useNavigate();
    const [userName,setUserName] = React.useState('');
    const [p_id,setPID] = React.useState('n')
    const [quizTitle,setQuizTitle] = React.useState("");
    const [quizDuration,setQuizDuration] = React.useState(1658299923247);
    const [questionList,setQuestoinList] = React.useState([]);
    const [currentQues,setCurrentQues] = React.useState(1);
    const [selected,setSelected] = React.useState('')
    const [score,setScore] = React.useState(0);
    const [quizEnded,setQuizEnded] = React.useState(false)
    const [timeLeft,setTimeLeft] = React.useState(1658299923247);
    const [showTimeUp,setShowTimesUp] = React.useState(false);

    const [selectedOptionsArray,setSelectedOptionArray] = React.useState(['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']) 
    const [myAnwerArray,setMyAnswerArray] = React.useState([0,0,0,0,0,0,0,0,0]);
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00:00');
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
    const startTimer = (e) => {
        let { total, hours, minutes, seconds }  = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }else{
            console.log("Time End")
            clearInterval(Ref.current);
            // upload score
            // Times up ui ok!
            setShowTimesUp(true);
        }
    }
    const clearTimer = (e) => { 
        setTimer('00:00:00');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + quizDuration*60);
        return deadline;
    }

    React.useEffect(()=>{
        var temp = 0;
        var len = questionList.length
        const arr = new Array(len).fill(0);
        questionList.map((value,idx)=>{
            console.log(value.answer,selectedOptionsArray[idx]);
            if (value.answer===selectedOptionsArray[idx]){
                arr[idx] = 1;
                temp = temp+1;
            }else{
                arr[idx] = 0;
            }
        })
        setMyAnswerArray(arr);
        setScore(temp);
    },[selectedOptionsArray])
    React.useEffect(()=>{
        console.log(id);
        var temp = []
        var ques_obj = new Question("Who is best Gupta's best friend","yogesh","shivanshu","tushar","arjun","yogesh");
        var ques_obj2 = new Question("Who is best Gupta's best friend","yogesh","shivanshu","tushar","arjun","yogesh");
        var ques_obj3 = new Question("Who is best Gupta's best friend","yogesh","shivanshu","tushar","arjun","yogesh");
        temp.push(ques_obj);
        temp.push(ques_obj2);
        temp.push(ques_obj3);
        setQuestoinList(temp);
        setQuizTitle("Self Assessment");
        setQuizDuration(2);
    },[]);
    const handleNext = (event) => {
        event.preventDefault();
        console.log("submitting ans",selected);
        let newarr = [...selectedOptionsArray];
        newarr[currentQues-1] = selected;
        setSelectedOptionArray(newarr);
        // check if length -1
        if (currentQues===questionList.length){
            setOpen(true);
            
        }else{
            setSelected(selectedOptionsArray[currentQues]);
            setCurrentQues(currentQues+1);
        }
    };

    function handleRadioChange(event){
        setSelected(event.target.value);
        //console.log(event.target.value);
    }

    function handlePagerChange(event,value){
        setCurrentQues(value);
        setSelected(selectedOptionsArray[value-1]);
    }
    function playAgain(){
        navigate(`/lecture/${id}`);
    }

    function endQuiz(){
        // add score to firestore
        // quiz ended
        setQuizEnded(true)
        setOpen(false)
        setShowTimesUp(false);
    }
    function usernamechangehandle(e){
        setUserName(e.target.value)
    }
    
    async function enterQuizClicked(){
        setStartQuiz(true);
        clearTimer(getDeadTime());
    }
    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <React.Fragment>
            <div style={{backgroundImage:`url(${bg})`, backgroundSize: "cover"
              ,backgroundPosition: "center"
             , width: "100%",
              height: "100%",
              position:'absolute',
  top:'0px' ,
  right:'0px' ,
  bottom:'0px' ,
  left:'0px'}}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Do you want to Submit?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={endQuiz} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={showTimeUp}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Times Up! Head Towards the Result.
                </DialogTitle>
                <DialogActions>
                    <Button onClick={endQuiz} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            {
            quizEnded ? (
                <Box sx={{ minWidth: 275 , display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',alignContent:'center' }}>
                    <Card variant="outlined" sx={{width:'50%', margin:'50px' ,backgroundColor:'#E8F6EF'}}>
                        <CardContent sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',alignContent:'center'}}>
                            <Typography variant="h4" component="div">
                                Your Score (Out of : {questionList.length})
                            </Typography>
                            <Typography variant="h1">
                                {score}
                            </Typography>
                            <Button onClick={playAgain}>
                                Home!
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            ) : (
                    startQuiz ? (

                        <Box sx={{ display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center', margin:'50px', alignContent:'center' }}>
                            <h1>{quizTitle}</h1>
                            <div>
                                <h2>{timer}</h2>
                            </div>
                            {
                                questionList.length===0 ? (
                                    <h1>Loading</h1>
                                ) : (
                                    <>
                                        <Pagination page={currentQues}  count={questionList.length} onChange={handlePagerChange} />
                                        <Paper elevation={4} sx={{width:'100%', marginTop:'30px',backgroundColor:'#E8F6EF'}}>
                                            <form onSubmit={handleNext}>
                                                <FormControl sx={{ m: 3 }} variant="standard">
                                                    <FormLabel id="questionform" fontSize='67' >{questionList[currentQues-1].desc}</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="questionform"
                                                        name="quiz"
                                                        value={selected}
                                                        onChange={handleRadioChange}
                                                        >
                                                        <FormControlLabel value={questionList[currentQues-1].option1} control={<Radio />} label={questionList[currentQues-1].option1} />
                                                        <FormControlLabel value={questionList[currentQues-1].option2} control={<Radio />} label={questionList[currentQues-1].option2} />
                                                        <FormControlLabel value={questionList[currentQues-1].option3} control={<Radio />} label={questionList[currentQues-1].option3} />
                                                        <FormControlLabel value={questionList[currentQues-1].option4} control={<Radio />} label={questionList[currentQues-1].option4} />
                                                    </RadioGroup>
                                                    <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                                                        {
                                                            currentQues === questionList.length ? (
                                                                <div>Submit</div>
                                                            ) : (
                                                                <div>Next</div>
                                                            )
                                                        }
                                                    </Button>
                                                </FormControl>
                                            </form>
                                        </Paper>
                                    </>
                                )
                            }
                            
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', justifyContent: 'center', height: '100vh' }}>
                        <Button className='button-85 btnQuiz'  onClick={enterQuizClicked}>
                          <div className='overview' style={{color:'#F8F6F4',fontSize:'30px'}}>Start Assessment</div>
                        </Button>
                      </Box>
                    )        
            )
            }
            </div>
        </React.Fragment>
    )
}

export default Quiz
