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
} from "../../apiHelpers";
import { getStudyGroupById } from "../../apiHelpers";

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
  position: relative; /* Added line */

  @media (max-width: 992px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 600px) {
    width: calc(100% - 20px);
  }
`;

const CardBody = styled.div`
  padding: 15px;
  padding-bottom: 90px; /* Add additional padding to create space for the CardFooter */
`;

const CardTitle = styled.h5`
  font-family: "Poppins", sans-serif;
  margin-top: 0;
`;

const CardFooter = styled.div`
  padding: 20px 15px; /* Add padding to create space between text and button */
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Button2 = styled.button`
  font-family: "Poppins", sans-serif;
  background-color: rgb(134, 158, 207);
  border: none;
  border-radius: 5px;
  padding: 6px 12px; /* Adjust padding to make the button smaller */
  font-size: 25px; /* Adjust font size */
  color: #fff;
  cursor: pointer;
  position: absolute;
  bottom: 10px; /* Adjust the distance from the bottom */
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  @media only screen and (max-width: 1920px) {
    padding: 4px 12px;
  }
`;
/**
 * Component for managing study groups.
 */
function StudyGroups(props) {
  const [studyGroupData, setStudyGroupData] = useState([]);
  const [formData, setFormData] = useState({
    courseName: "",
    room: "",
    date: "",
    time: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [userInAttendeeList, setUserInAttendeeList] = useState({});
  const [seatAvailability, setSeatAvailability] = useState({});

  useEffect(() => {
    // Fetch study group list when component mounts
    getStudyGroupList(setStudyGroupData);
    getUserInformation(setCurrentUser);
  }, []);

  useEffect(() => {
    // Update userInAttendeeList whenever studyGroupData changes
    updateAttendeeListStatus();
  }, [studyGroupData]);

  const updateAttendeeListStatus = async () => {
    const status = {};
    for (const studyGroup of studyGroupData) {
      try {
        const isInAttendeeList = await isUserInAttendeeList(
          studyGroup.studyGroupId
        );
        status[studyGroup.studyGroupId] = isInAttendeeList;
      } catch (error) {
        console.error(
          `Error checking attendee list for study group ${studyGroup.studyGroupId}:`,
          error
        );
        status[studyGroup.studyGroupId] = false;
      }
    }
    setUserInAttendeeList(status);
  };

  const colors = ["#FFDCB9", "#B9E1DC", "#D9E4DD", "#CBE7C4", "#E0C3FC"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timestamp = `${formData.date}T${formData.time}:00`;
      const studyGroup = {
        courseName: formData.courseName,
        room: formData.room,
        timestamp: timestamp,
        seatLimit: 5,
      };
      await createStudyGroup(studyGroup);
      alert("New study group was created.");
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
      const isInAttendeeList = userInAttendeeList[studyGroup.studyGroupId];
      if (isInAttendeeList) {
        console.log("Leaving Study Group: " + studyGroup.courseName);
        // User is already in the attendee list, so leave the study group
        await leaveStudyGroup({ studyGroupId: studyGroup.studyGroupId });
      } else {
        console.log("Joining Study Group: " + studyGroup.courseName);
        // User is not in the attendee list, so join the study group
        await joinStudyGroup({ studyGroupId: studyGroup.studyGroupId });
      }
      // Refresh the study group list after joining or leaving
      getStudyGroupList(setStudyGroupData);
    } catch (error) {
      console.error("Error joining or leaving study group:", error);
    }
  };

  const isUserInAttendeeList = async (studyGroupId) => {
    try {
      const studyGroupDetails = await getStudyGroupById(studyGroupId);
      const attendeeList = studyGroupDetails.attendeeList;
      const currentUserDisplayName = currentUser.displayName;
      const isUserInList = attendeeList.some(
        (attendee) => attendee.displayName === currentUserDisplayName
      );
      return isUserInList;
    } catch (error) {
      console.error("Error fetching study group details:", error);
      return false;
    }
  };

  useEffect(() => {
    // Fetch seat availability for all study groups
    const fetchSeatAvailability = async () => {
      const availability = {};
      for (const studyGroup of studyGroupData) {
        try {
          const seats = await getSeatAvailability(studyGroup.studyGroupId);
          availability[studyGroup.studyGroupId] = seats;
        } catch (error) {
          console.error(
            `Error fetching seat availability for study group ${studyGroup.studyGroupId}:`,
            error
          );
          availability[studyGroup.studyGroupId] = 0;
        }
      }
      setSeatAvailability(availability);
    };

    fetchSeatAvailability();
  }, [studyGroupData]);

  const getSeatAvailability = async (studyGroupId) => {
    try {
      const studyGroupDetails = await getStudyGroupById(studyGroupId);
      const attendeeList = studyGroupDetails.attendeeList;
      return attendeeList.length;
    } catch (error) {
      console.error("Error fetching study group details:", error);
      return 0;
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
                      inputProps={{
                        pattern: "[A-Za-z0-9]{6}",
                        title:
                          "Room must be 6 characters long and alphanumeric",
                      }}
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
                      fullWidth
                      size="large"
                      sx={{
                        backgroundColor: "#003fa7",
                        "&:hover": {
                          backgroundColor: "#003fa7",
                          opacity: 0.9,
                        },
                      }}
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
                <strong>Availability:</strong>{" "}
                {studyGroup.seatLimit -
                  seatAvailability[studyGroup.studyGroupId]}
              </p>
            </CardBody>
            <CardFooter>
              <Button2 onClick={() => handleJoinLeave(studyGroup)}>
                {userInAttendeeList[studyGroup.studyGroupId] ? "Leave" : "Join"}
              </Button2>
            </CardFooter>
          </Card>
        ))}
      </GridContainer>
    </Container>
  );
}

export default StudyGroups;
