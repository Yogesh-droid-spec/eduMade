import React,{useState,useEffect, useRef} from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom'
import chalk from 'chalk';
import Casa from './Casa';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import { Padding, WidthFull } from '@mui/icons-material';
import { makeStyles } from '@mui/material';
import  "./index.css"
import background from './lecture.jpg'

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function Lecture() {
  
  const lec_id = useParams().id;
  const pdfRef = useRef();

  let lecture ={
    'heading':"Water Cycle" , 'overview':"The water cycle, also known as the hydrologic cycle or the hydrological cycle, describes the continuous movement of water on, above and below the surface of the Earth.",'taught_by':"Yogesh Bhatt",
    'created':"13-5-2023",'notes':["The water cycle is a continuous process in which water circulates between the Earth's surface, the atmosphere, and back again.","It begins with the process of evaporation, where water from bodies of water, such as lakes and oceans, is heated by the sun and turns into water vapor.","The water vapor rises into the atmosphere and condenses to form clouds through a process called condensation.","Precipitation falls from the clouds back to the Earth's surface."]

  }

  const downloadPDF = () => {
    const input = pdfRef.current;;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l','mm','a4',true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
      const imgX = (pdfWidth-imgWidth*ratio)/2;
      const imgY = 30;
      pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
      pdf.save(`${lecture.heading}.pdf`);
    });
  };
  
  
  
  return (
          
       <>
    
    <div >
      <div style ={{padding:'0px,0px,0px,0px'}} ref={pdfRef}>
        <br /><br />
        <Box  sx={{ flexGrow: 1  }}>
      <AppBar  position="static" style={{backgroundColor:'#333333'}}
      >
        <Toolbar >
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <h2 className='title'>{lecture.heading}</h2> 
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Typography variant='h6' className='meta'>Lecturer: {lecture.taught_by}</Typography>
        <Box sx={{ height: 8 }} />
        <Typography variant="subtitle1" className='meta'>Date created: {lecture.created}</Typography>
      </Box>
    </Toolbar>
  </AppBar>
</Box>
        <br /><br />
        
          <h2 className='heading' style={{paddingLeft:'10px'}}>Overview:</h2>
          <div className='overview' style={{paddingLeft:'10px'}}>{lecture.overview}</div>
        
        
        <br />
        <div style={{}}>

        </div>
     
        <br />
        <h2 className='heading' style={{paddingLeft:'10px'}}>Notes:</h2>
        {lecture.notes.map((note, idx) => {
          
          return <p className='overview' style={{paddingLeft:'10px'}} >🌲{note}</p>;
        })}
      <div style={{ display: 'flex', justifyContent: 'flex-end',marginBottom:'20px' }}>
          <Button variant="contained" size='large'>Self-Assessment</Button>
          <Button variant="contained" size='large' onClick={downloadPDF}>Generate PDF</Button>
         
        </div>
    data
        
        { <Casa /> }
      
      </div>
      </div>
      
      </>
          
          
          
      
    
  )
}

export default Lecture