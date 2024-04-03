import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { createTutoringSession, getTutoringSessions } from '../../apiHelpers';

function Tutoring() {
  const [courseName, setCourseName] = useState('');
  const [tutorLevel, setTutorLevel] = useState('');
  const [tutorSessions, setTutorSessions] = useState([]);

  useEffect(() => {
    // Fetch tutor sessions on component mount
    fetchTutoringSessions();
  }, []);

  const fetchTutoringSessions = () => {
    getTutoringSessions(setTutorSessions);
  };

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleTutorLevelChange = (event) => {
    setTutorLevel(event.target.value);
  };

  const handleAddSession = async () => {
    if (courseName.trim() !== '' && tutorLevel.trim() !== '') {
      const formData = {
        courseName: courseName,
        tutorLevelId: tutorLevel
      };
      await createTutoringSession(formData);
      // Refresh tutor sessions list after adding new session
      fetchTutoringSessions();
      setCourseName('');
      setTutorLevel('');
    }
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      <Grid item xs={12} sx={{ paddingRight: 2 }}>
        <Box maxWidth="100%" margin="auto" padding={2}>
          <Box sx={{ marginBottom: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, marginBottom: 2 }}>
              <TextField
                label="Course Name"
                variant="outlined"
                value={courseName}
                onChange={handleCourseNameChange}
                fullWidth
                sx={{ flex: '1 1 auto' }}
              />
              <TextField
                select
                label="Tutor Level"
                value={tutorLevel}
                onChange={handleTutorLevelChange}
                variant="outlined"
                fullWidth
                sx={{ flex: '1 1 auto' }}
              >
                <MenuItem value="1">Beginner</MenuItem>
                <MenuItem value="2">Intermediate</MenuItem>
                <MenuItem value="3">Advanced</MenuItem>
              </TextField>
              <Button onClick={handleAddSession} variant="contained" sx={{ backgroundColor: '#003FA7', color: 'white', flex: '0 0 auto' }}>
                Add
              </Button>
            </Box>
          </Box>
  
          <Grid container spacing={6}>
            {tutorSessions.map((session) => (
              <Grid item xs={12} sm={6} md={3} key={session.tutorSessionId}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {session.courseName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tutor Level: {session.tutorLevel.name}
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
