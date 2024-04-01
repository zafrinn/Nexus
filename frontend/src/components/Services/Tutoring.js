import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material';
import tutorData from './tutor_data.json';

function Tutoring() {
  const [courseName, setCourseName] = useState('');
  const [tutorLevel, setTutorLevel] = useState('');
  const [tutorSessions, setTutorSessions] = useState(tutorData.tutorSessions);

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleTutorLevelChange = (event) => {
    setTutorLevel(event.target.value);
  };

  const handleAddSession = () => {
    if (courseName.trim() !== '' && tutorLevel.trim() !== '') {
      const newSession = {
        course_name: courseName,
        tutorLevels: tutorLevel, 
        tutor_session_id: tutorSessions.length + 1,
        user_id: tutorSessions.length + 1 
      };
      setTutorSessions([...tutorSessions, newSession]);
      setCourseName('');
      setTutorLevel('');
    }
  };
  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      <Grid item xs={12} sx={{ paddingRight: 2 }}>
        <Box maxWidth="100%" margin="auto" padding={2}>
          <Box sx={{ marginBottom: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
              <TextField
                label="Course Name"
                variant="outlined"
                value={courseName}
                onChange={handleCourseNameChange}
                fullWidth
              />
              <TextField
                select
                label="Tutor Level"
                value={tutorLevel}
                onChange={handleTutorLevelChange}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </TextField>
            </Box>
            <Button onClick={handleAddSession} variant="contained" sx={{ backgroundColor: '#003FA7', color: 'white' }}>
              Add
            </Button>
          </Box>
  
          <Grid container spacing={6}>
            {tutorSessions.map((session) => (
              <Grid item xs={12} sm={6} md={3} key={session.tutor_session_id}> {/* Keeps 4 cards in a row on md screens */}
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {session.course_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tutor Level: {session.tutorLevels}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ justifyContent: 'flex-end', padding: '0 16px 8px' }}>
                    <Button size="small" sx={{ color: '#003FA7', backgroundColor: 'white' }}>
                      Contact
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
export default Tutoring;