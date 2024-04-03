import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextField, Button, Grid, Paper } from "@mui/material";
import {
  createStudyGroup,
  getStudyGroupList,
  getUserInformation,
  joinStudyGroup,
  leaveStudyGroup,
  updateStudyGroup,
} from "../../apiHelpers"; // Import createStudyGroup, getStudyGroupList, joinStudyGroup, leaveStudyGroup, and updateStudyGroup functions
import { getStudyGroupById } from "../../apiHelpers"; // Import getStudyGroupById function

const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 15px;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Card = styled.div`
  width: calc(33.33% - 20px);
  margin-bottom: 20px;
  margin-right: 20px;
  margin-top: 20px;
  background-color: ${(props) => props.bgColor};
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardBody = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h5`
  font-family: "Poppins", sans-serif;
  margin-top: 0;
`;

const CardFooter = styled.div`
  padding: 10px 15px;
  display: flex;
  justify-content: center;
`;

const Button2 = styled.button`
  font-family: "Poppins", sans-serif;
  background-color: rgb(134, 158, 207);
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  color: #fff;
  cursor: pointer;
  max-width: 100%;
`;

function StudyGroups(props) {
  const [studyGroupData, setStudyGroupData] = useState([]);
  const [formData, setFormData] = useState({
    courseName: "",
    room: "",
    date: "",
    time: "",
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch study group list when component mounts
    getStudyGroupList(setStudyGroupData);
    getUserInformation(setCurrentUser);
  }, []);

  useEffect(() => {
    // Fetch current user's information (e.g., displayName and emailAddress)
    // Here you would call a function to get the current user's information and set it to currentUser state
    // For example:
    // getCurrentUserInformation().then(user => setCurrentUser(user));
    // This depends on how you manage user authentication and information retrieval in your application
  }, []);

  const colors = ["#FFDCB9", "#B9E1DC", "#D9E4DD", "#CBE7C4", "#E0C3FC"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timestamp = `${formData.date}T${formData.time}:00`;
      const studyGroup = {
        courseName: formData.courseName,
        room: formData.room,
        timestamp: timestamp,
        seatLimit: 5, // Assuming seat limit is always 4
      };
      await createStudyGroup(studyGroup);
      getStudyGroupList(setStudyGroupData);
      setFormData({
        courseName: "",
        room: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Error creating study group:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleJoinLeave = async (studyGroup) => {
    // Check if user is the maker of the study group
    if (studyGroup.displayName === currentUser.displayName) {
      alert("Cannot join the study group you made.");
      return;
    }

    try {
      const isInAttendeeList = await isUserInAttendeeList(
        studyGroup.studyGroupId
      );
      if (isInAttendeeList) {
        console.log("Leaving Study Group: " + studyGroup.courseName);
        // User is already in the attendee list, so leave the study group
        await leaveStudyGroup({ studyGroupId: studyGroup.studyGroupId });
        // await updateStudyGroup({
        //   ...studyGroup,
        //   seatLimit: studyGroup.seatLimit + 1,
        // });
      } else {
        console.log("Joining Study Group: " + studyGroup.courseName);
        // User is not in the attendee list, so join the study group
        await joinStudyGroup({ studyGroupId: studyGroup.studyGroupId });
        // await updateStudyGroup({
        //   ...studyGroup,
        //   seatLimit: studyGroup.seatLimit - 1,
        // });
      }
      // Refresh the study group list after joining or leaving
      getStudyGroupList(setStudyGroupData);
    } catch (error) {
      console.error("Error joining or leaving study group:", error);
    }
  };

  const isUserInAttendeeList = async (studyGroupId) => {
    try {
      // console.log("Checking attendee list for study group:", studyGroupId);
      const studyGroupDetails = await getStudyGroupById(studyGroupId);
      // console.log("Study Group Details:", studyGroupDetails);

      const attendeeList = studyGroupDetails.attendeeList;
      // console.log("Attendee List:", attendeeList);

      const currentUserDisplayName = currentUser.displayName; // Assuming currentUser contains displayName

      const isUserInList = attendeeList.some(
        (attendee) => attendee.displayName === currentUserDisplayName
      );
      // console.log("Is User in Attendee List:", isUserInList);

      return isUserInList;
    } catch (error) {
      console.error("Error checking attendee list:", error);
      return false;
    }
  };

  return (
    <Container>
      <div className="StudyGroupForm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      id="courseName"
                      name="courseName"
                      label="Course Name"
                      variant="outlined"
                      margin="normal"
                      required
                      value={formData.courseName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      id="room"
                      name="room"
                      label="Room"
                      variant="outlined"
                      margin="normal"
                      required
                      value={formData.room}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      fullWidth
                      id="date"
                      name="date"
                      label="Date"
                      variant="outlined"
                      type="date"
                      margin="normal"
                      required
                      InputLabelProps={{ shrink: true }}
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      fullWidth
                      id="time"
                      name="time"
                      label="Time"
                      variant="outlined"
                      type="time"
                      margin="normal"
                      required
                      InputLabelProps={{ shrink: true }}
                      value={formData.time}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <GridContainer>
        {studyGroupData.map((studyGroup, index) => (
          <Card key={index + 1} bgColor={colors[index % colors.length]}>
            <CardBody>
              <CardTitle>{studyGroup.courseName}</CardTitle>
              <hr />
              <p>
                <strong>Room:</strong> {studyGroup.room}
              </p>
              <p>
                <strong>Date:</strong> {studyGroup.timestamp.split("T")[0]}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {studyGroup.timestamp.split("T")[1].slice(0, -3)}
              </p>
              <p>
                <strong>Seat Limit:</strong> {studyGroup.seatLimit}
              </p>
            </CardBody>
            <CardFooter>
              <Button2 onClick={() => handleJoinLeave(studyGroup)}>
                {isUserInAttendeeList(studyGroup.studyGroupId)
                  ? "Leave"
                  : "Join"}
              </Button2>
            </CardFooter>
          </Card>
        ))}
      </GridContainer>
    </Container>
  );
}

export default StudyGroups;
