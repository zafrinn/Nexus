import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, Grid, Paper } from "@mui/material";
import { createStudyGroup } from "../../apiHelpers"; // Import createStudyGroup function

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
  const [contacts, setContacts] = useState([]);

  const colors = ["#FFDCB9", "#B9E1DC", "#D9E4DD", "#CBE7C4", "#E0C3FC"];

  const icons = ["frame.png", "calendar.png", "clock.png", "location.png"];

  const [addFormData, setAddFormData] = useState({
    courseName: "",
    room: "",
    date: "",
    time: "",
  });

  const handleAddFormChange = (e) => {
    const fieldName = e.target.name;
    let fieldValue = e.target.value;
    fieldValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);

    setAddFormData({ ...addFormData, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Combine date and time from input fields
      const timestamp = `${addFormData.date}T${addFormData.time}:00`;

      // Create the study group object with the combined timestamp
      const newStudyGroup = {
        timestamp,
        room: addFormData.room,
        courseName: addFormData.courseName,
        seatLimit: 4, // Assuming seat limit is always 4
      };

      // Call the createStudyGroup API function with the new study group object
      await createStudyGroup(newStudyGroup);

      // Clear the form fields
      setAddFormData({
        courseName: "",
        room: "",
        date: "",
        time: "",
      });

      // Optionally, you can fetch and update the list of study groups here
    } catch (error) {
      console.error("Error creating study group:", error);
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
                      value={addFormData.courseName}
                      onChange={handleAddFormChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      id="room"
                      name="room"
                      label="Room"
                      variant="outlined"
                      margin="normal"
                      required
                      value={addFormData.room}
                      onChange={handleAddFormChange}
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
                      value={addFormData.date}
                      onChange={handleAddFormChange}
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
                      value={addFormData.time}
                      onChange={handleAddFormChange}
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
        {contacts.map((contact, index) => (
          <Card key={index + 1} bgColor={colors[index % colors.length]}>
            <CardBody>
              <CardTitle>{contact.courseName}</CardTitle>
              <hr />
              <p>
                <strong>Room:</strong> {contact.room}
              </p>
              <p>
                <strong>Date:</strong> {contact.date}
              </p>
              <p>
                <strong>Time:</strong> {contact.time}
              </p>
            </CardBody>
            <CardFooter>
              <Button2>Join</Button2>
            </CardFooter>
          </Card>
        ))}
      </GridContainer>
    </Container>
  );
}

export default StudyGroups;
