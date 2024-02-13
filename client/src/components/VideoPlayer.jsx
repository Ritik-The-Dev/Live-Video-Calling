import React, { useContext, useState } from 'react';
import { Grid, Typography, Paper, makeStyles, Slider } from '@material-ui/core';

import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    display: 'inline-block',
    position: 'relative',
  },
  video: {
    width: '550px',
    filter: 'brightness(100%)', // Initial brightness value
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  slider: {
    position: 'absolute',
    width: '80%',
    bottom: '0',
    left: '0',
    padding: '20px',
    fontWeight: 'bold',
    marginBottom:'-1.5rem'
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();
  
  // State variable to manage brightness value
  const [brightness, setBrightness] = useState(110);

  // Function to handle brightness change
  const handleBrightnessChange = (event, newValue) => {
    setBrightness(newValue);
  };

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <div className={classes.videoContainer}>
              <video playsInline muted ref={myVideo} autoPlay className={classes.video} style={{ filter: `brightness(${brightness}%)` }} />
              {/* Slider to set brightness */}
              <Slider
                className={classes.slider}
                value={brightness}
                onChange={handleBrightnessChange}
                min={100}
                max={200}
                step={1}
                aria-labelledby="brightness-slider"
              />
            </div>
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <div className={classes.videoContainer}>
              <video playsInline ref={userVideo} autoPlay className={classes.video} style={{ filter: `brightness(${brightness}%)`, marginBottom:"2rem"}} />
              {/* Slider to set brightness */}
              <Slider
                className={classes.slider}
                value={brightness}
                onChange={handleBrightnessChange}
                min={100}
                max={200}
                step={1}
                aria-labelledby="brightness-slider"
              />
            </div>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
