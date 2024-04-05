import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import {
  createTutoringSession,
  getTutoringSessions,
  contactTutorSessionOwner,
  getUserInformation,
} from "../../apiHelpers";

/**
 * Component for managing tutoring sessions, including adding new sessions and contacting session owners.
 */
function Tutoring() {
  const [courseName, setCourseName] = useState("");
  const [tutorLevel, setTutorLevel] = useState("");
  const [tutorSessions, setTutorSessions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch tutor sessions on component mount
    fetchTutoringSessions();
    getUserInformation(setCurrentUser);
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
    if (courseName.trim() !== "" && tutorLevel.trim() !== "") {
      const formData = {
        courseName: courseName,
        tutorLevelId: tutorLevel,
      };
      await createTutoringSession(formData);
      alert("A new tutoring entry was added.");
      // Refresh tutor sessions list after adding new session
      fetchTutoringSessions();
      setCourseName("");
      setTutorLevel("");
    }
  };

  // Function to handle contact button click
  const handleContactButtonClick = async (session) => {
    const formData = {
      tutorSessionId: session.tutorSessionId,
      message: "Interested in this tutor session!",
    };

    if (session.displayName == currentUser.displayName) {
      alert("Cannot contact a session you created!");
    } else {
      await contactTutorSessionOwner(formData);
      alert("An email was sent to the tutor!");
    }
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      <Grid item xs={12} sx={{ paddingRight: 2 }}>
        <Box maxWidth="100%" margin="auto" padding={2}>
          <Box sx={{ marginBottom: 4 }}>
            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
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
                <MenuItem value="1">Beginner</MenuItem>
                <MenuItem value="2">Intermediate</MenuItem>
                <MenuItem value="3">Advanced</MenuItem>
              </TextField>
              <Button
                onClick={handleAddSession}
                variant="contained"
                sx={{
                  backgroundColor: "#003FA7",
                  color: "white",
                  flex: "0 0 auto",
                }}
              >
                Add
              </Button>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {tutorSessions.map((session) => (
              <Grid item xs={12} sm={6} md={3} key={session.tutorSessionId}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
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
                  <CardActions
                    sx={{ justifyContent: "center", padding: "0 14px 8px" }}
                  >
                    <Button
                      size="small"
                      sx={{ color: "#003FA7", backgroundColor: "white" }}
                      onClick={() => handleContactButtonClick(session)}
                    >
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
