import { Card, Grid } from '@mui/material';
import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import  "./index.css"
import background from './background.png'
import Paper from '@mui/material/Paper';
// import { server_home } from '../secret/secret';



function Subject() {
    // const subject_name = useParams().id;
    // const [lectureList,setLectureList] = useState([]);
    const navigate = useNavigate();
    // async function getLectureList(){
    //     const response = await fetch(`${server_home}/util/subject/${subject_name}`,{
    //         method:'GET',
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //         credentials:'include',
    //     })
    //     const data = response.json();
    //     data.then(res=>{
    //         setLectureList(res.data);
    //         console.log(res.data);
    //     })
    // }
    var lectureList = [{'heading':"Guptas Scam" , 'overview':"Gupta scammed a lot of students in gbpiet",'taught_by':"Yogesh Bhatt",
    'created':"13-5-2023",'notes':["Gupta is gupta","Gupta is kujli waala kutta","Gupta loves Pet"]},{'heading':"Guptas Scam" , 'overview':"Gupta scammed a lot of students in gbpiet",'taught_by':"Yogesh Bhatt",
    'created':"13-5-2023",'notes':["Gupta is gupta","Gupta is kujli waala kutta","Gupta loves Pet"]} ,{
        'heading':"Guptas Scam" , 'overview':"Gupta scammed a lot of students in gbpiet photosynthesis, the process by which green plants and certain other organisms transform light energy into chemical energy. During photosynthesis in green plants, light energy is captured and used to convert water, carbon dioxide, and minerals into oxygen and energy-rich organic compounds.",'taught_by':"Yogesh Bhatt",
        'created':"13-5-2023",'notes':["Gupta is gupta","Gupta is kujli waala kutta","Gupta loves Pet","Photosynthesis is also used by algae to convert solar energy into chemical energy. Oxygen is liberated as a by-product and light is considered as a major factor to complete the process of photosynthesis.","These sugars are then sent to the roots, stems, leaves, fruits, flowers and seeds. In other words, these sugars are used by the plants as an energy source, which helps them to grow. These sugar molecules then combine with each other to form more complex carbohydrates like cellulose and starch. The cellulose is considered as the structural material that is used in plant cell walls."
      ,"Another by-product of photosynthesis is sugars such as glucose and fructose."]
      },{
        'heading':"Guptas Scam" , 'overview':"Gupta scammed a lot of students in gbpiet photosynthesis, the process by which green plants and certain other organisms transform light energy into chemical energy. During photosynthesis in green plants, light energy is captured and used to convert water, carbon dioxide, and minerals into oxygen and energy-rich organic compounds.",'taught_by':"Yogesh Bhatt",
        'created':"13-5-2023",'notes':["Gupta is gupta","Gupta is kujli waala kutta","Gupta loves Pet","Photosynthesis is also used by algae to convert solar energy into chemical energy. Oxygen is liberated as a by-product and light is considered as a major factor to complete the process of photosynthesis.","These sugars are then sent to the roots, stems, leaves, fruits, flowers and seeds. In other words, these sugars are used by the plants as an energy source, which helps them to grow. These sugar molecules then combine with each other to form more complex carbohydrates like cellulose and starch. The cellulose is considered as the structural material that is used in plant cell walls."
      ,"Another by-product of photosynthesis is sugars such as glucose and fructose."]
      }]
    function lectureClicked(tar){
        navigate('/lecture/'+tar)
    }
    // useEffect(() => {
    //     console.log("USE EFFECT")
    //     getLectureList();
    //   },[]);
    
    return (
        <div style={{ backgroundColor: "#f1f1f1", minHeight: "100vh" }}>
          <header style={{ backgroundColor: "#333", padding: "20px", color: "#fff" }}>
            <center>
              <h1 className='title'>Chemistry</h1>
            </center>
          </header>
          <div
            style={{
              paddingTop: "40px",
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%"
            }}
          >
            {lectureList ? (
              <Grid container justifyContent="center" spacing={4} sx={{ flexWrap: 'wrap' }}>
                {lectureList.map((lec, idx) => (
                  <Grid key={lec} item>
                    <Paper
                      sx={{
                        height: 200,
                        width: 400,
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
                        borderRadius: 8,
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#fff' : '#333',
                        padding: "10px",
                        display: "flex",
                        position: 'relative',
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                        transition: "box-shadow 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                        },
                      }}
                    >
                      <div>
                        <h3 className='heading' style={{ fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>{lec.heading}</h3>
                        <div className='multiline-ellipsis'>
                          <p className='overviewX' style={{ fontSize: '15px', lineHeight: "1.5", letterSpacing: "1.5px" }}>{lec.overview}</p>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", position: 'absolute', bottom: '1px', right: '10px' }}>
                        <p style={{ fontSize: "14px", color: "#888", opacity: 0.8, overflow: 'hidden' }}>{lec.created}</p>
                      </div>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
                <h1>nothing</h1>
              )}
          </div>
        </div>
      );
}

export default Subject  