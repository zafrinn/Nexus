import React from 'react';
import styled from 'styled-components';
import location from './location.png';
import calendar from './calendar.png';
import frame from './frame.png';
import clock from './clock.png';

const Container = styled.div`
  max-width: 1200px; /* Adjust max-width as needed */
  margin: 20px auto; /* Add space to the top of the screen */
  padding: 0 15px; /* Add some padding to the sides */
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* Adjusted to distribute space between cards */
`;

const Card = styled.div`
  width: calc(33.33% - 20px); /* Adjust width and margin as needed */
  margin-bottom: 20px;
  margin-right:20px; /* Add margin between cards */
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

const Button = styled.button`
  font-family:'Poppins', sans-serif;
  background-color: rgb(134, 158, 207);
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  color: #fff;
  cursor: pointer;
  max-width: 100%; /* Ensure the button stays within the card */
`;

function StudyGroups() {
  const courses = [
    "Mathematics",
    "Physics",
    "Biology",
    "Chemistry",
    "History",
    "Literature",
    "Computer Science",
    "Art"
  ];

  const colors = [
    "#FFDCB9", 
    "#B9E1DC", 
    "#D9E4DD", 
    "#CBE7C4", 
    "#E0C3FC"  
  ];

  const icons = [frame, calendar, clock, location];

  const boxes = courses.map((course, index) => ({
    id: index + 1,
    title: course,
    user: "User",
    days: "Days",
    timing: "Timing",
    location: "Location",
    bgColor: colors[index % colors.length], 
    icon: icons[index % icons.length] 
  }));

  return (
    <Container>
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
                <strong>Days: </strong>{box.days}
              </p>
              <p>
                <img src={clock} alt="Clock Icon" style={{ marginRight: '5px', width: '20px', height: '20px' }} />
                <strong>Timing:</strong> {box.timing}
              </p>
              <p>
                <img src={location} alt="Location Icon" style={{ marginRight: '5px', width: '20px', height: '20px' }} />
                <strong>Location:</strong> {box.location}
              </p>
            </CardBody>
            <CardFooter>
              <Button>Join</Button>
            </CardFooter>
          </Card>
        ))}
      </GridContainer>
    </Container>
  );
}

export default StudyGroups;
