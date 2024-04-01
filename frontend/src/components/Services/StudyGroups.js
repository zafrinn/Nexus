import React, { useState } from 'react';
import styled from 'styled-components';
import location from './location.png';
import calendar from './calendar.png';
import frame from './frame.png';
import clock from './clock.png';
import data from "./mockStudyGroups.json";

import { TextField, Button, Grid, Paper } from '@mui/material';

// Removed unnecessary import
import styles from './services.module.css';



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
  margin-right:20px;
  background-color: ${(props) => props.bgColor};
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardBody = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h5`
  font-family: 'Poppins', sans-serif;
  margin-top: 0;
`;

const CardFooter = styled.div`
  padding: 10px 15px;
  display: flex;
  justify-content: center;
`;

const Button2 = styled.button`
  font-family:'Poppins', sans-serif;
  background-color: rgb(134, 158, 207);
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  color: #fff;
  cursor: pointer;
  max-width: 100%;
`;

function StudyGroups(props) {
  const [contacts, setContacts] = useState(data);

  const colors = [
    "#FFDCB9", 
    "#B9E1DC", 
    "#D9E4DD", 
    "#CBE7C4", 
    "#E0C3FC"  
  ];

  const icons = [frame, calendar, clock, location];

  const boxes = contacts.map((contact, index) => ({
    id: index + 1,
    title: contact.title,
    user: contact.user,
    date: contact.date,
    time: contact.time,
    location: contact.location,
    bgColor: colors[index % colors.length], 
    icon: icons[index % icons.length] 
  }));

  const [addFormData, setAddFormData] = useState({
    title: "",
    user: "",
    location:"",
    date: "",
    time:"",

  });

  const handleAddFormChange = (e) => {
    const fieldName = e.target.name;
    let fieldValue = e.target.value;
    fieldValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);

    setAddFormData({ ...addFormData, [fieldName]: fieldValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      title: addFormData.title,
      user: addFormData.user,
      location: addFormData.location,
      date: addFormData.date,
      time: addFormData.time,
      
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  return (
    <Container>
    <div className={styles.StudyGroupForm}>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <Paper elevation={3} style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3} >
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    variant="outlined"
                    margin="normal"
                    required
                    onChange={handleAddFormChange}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    id="user"
                    name="user"
                    label="User"
                    variant="outlined"
                    margin="normal"
                    required
                    onChange={handleAddFormChange}
                  />
                </Grid>

                <Grid item xs={12} sm={2} >
                  <TextField
                    fullWidth
                    id="location"
                    name="location"
                    label="Location"
                    variant="outlined"
                    margin="normal"
                    required
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
        {boxes.map((box) => (
          <Card key={box.id} bgColor={box.bgColor}>
            <CardBody>
              <CardTitle>{box.title}</CardTitle>
              <hr />
              <p>
                <img src={frame} alt="User Icon" style={{ marginRight: '5px', width: '20px', height: '20px' }} />
                <strong>User:</strong> {box.user}
              </p>
              <p>
               
              <img src={calendar} alt="Calendar Icon" style={{ marginRight: '5px', width: '20px', height: '20px' }} />
                <strong>Date: </strong>{box.date}
              </p>
              <p>
                <img src={clock} alt="Clock Icon" style={{ marginRight: '5px', width: '20px', height: '20px' }} />
                <strong>Time:</strong> {box.time}
              </p>
              <p>
                <img src={location} alt="Location Icon" style={{ marginRight: '5px', width: '20px', height: '20px' }} />
                <strong>Location:</strong> {box.location}
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
