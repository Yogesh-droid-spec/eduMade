import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useNavigate,Link } from 'react-router-dom';
import Grid from '@mui/material/Grid'
import { Avatar } from '@mui/material';
import { ReactSVG } from 'react-svg';
import Menu from './Menu'
import background from './lecture.jpg'
import './index.css'
import math from './maths.jpg'
import bio from './5451375.png'
import social from './socialscience.png'
import hist from './history.jpg'
import cs from './cs.jpg'
import chems from './chemistry.jpg'

// TODO ->
// subject blocks
function Home() {
  const subjectList = ["Mathematics", "Biology", "Chemistry", "Computer Science", "History", "Social Science"];
  const subImg = [math,bio,chems,cs,hist,social]
  const navigate = useNavigate();

  function handleSubjectSelect(subjectName) {
    console.log(subjectName);
    navigate('/subject/' + subjectName);
  }

  return (
    <>
      <Menu />
      <div style={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        padding: "40px",
      }}>
        <Grid sx={{ flexGrow: 1 }} paddingTop={5} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={12}>
              {subjectList.map((value,idx) => (
                <Grid key={value} item>
                  <Paper
                    style={{ border: ` 25` }}
                    sx={{
                      height: 300,
                      width: 300,
                      backgroundColor: '#F1F6F9',
                      borderRadius: '8'
                    }}
                  >
                    <div style={{ position: 'relative', height: '100%' }}>
                      <img
                        src={subImg[idx]}
                        alt="Subject Image"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </div>
                    <Box p={1}>
                      <Typography className='heading' color={'#F1F6F9'} variant="h5">{value}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Home