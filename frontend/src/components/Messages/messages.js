import React, { useState, useEffect } from 'react';
import styles from './messages.css'; 
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import mockData from './mockData.json'; //For testing

function MessagesPage() {
  const [newQuestion, setNewQuestion] = useState('');
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [answerInputs, setAnswerInputs] = useState([]);

  //Remove once backend is connected
  useEffect(() => {
    setUnansweredQuestions(mockData.unansweredQuestions);
    setAnsweredQuestions(mockData.answeredQuestions);
    setAnswerInputs(Array(mockData.unansweredQuestions.length).fill(''));
  }, []);

  const handleQuestionSubmit = () => {
    if (newQuestion.trim() !== '') {
      const newQuestionObj = {
        discussion_id: unansweredQuestions.length + 1,
        description: newQuestion,
        created_timestamp: new Date().toISOString(),
        updated_timestamp: new Date().toISOString(),
        user_id: 1 
      };
      setUnansweredQuestions([...unansweredQuestions, newQuestionObj]);
      setNewQuestion('');
      setAnswerInputs([...answerInputs, '']);
    }
  };

  const handleAnswerSubmit = (index) => {
    const answerInput = answerInputs[index];
    const question = unansweredQuestions[index];
    if (answerInput.trim() !== '') {
      const updatedUnansweredQuestions = unansweredQuestions.filter((_, i) => i !== index);
      setUnansweredQuestions(updatedUnansweredQuestions);
      const answeredQuestion = {
        ...question,
        answer: answerInput
      };
      setAnsweredQuestions([...answeredQuestions, { question, answer: answerInput }]);
      const updatedAnswerInputs = [...answerInputs];
      updatedAnswerInputs.splice(index, 1);
      setAnswerInputs(updatedAnswerInputs);
    }
  };

  const handleAnswerInputChange = (index, value) => {
    const updatedAnswerInputs = [...answerInputs];
    updatedAnswerInputs[index] = value; 
    setAnswerInputs(updatedAnswerInputs);
  };

  return (
    <div className={` container`}>
      <div className={`row`}>
        <div className={`${styles.dashBoardColFirst} col-md-6`}>
          <div className={styles.colorBackground}>
           
            <h2>Ask Anything</h2>
            <input
              type="text"
              placeholder="Enter your question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <button onClick={handleQuestionSubmit}>Submit</button>
          </div>
        </div>

        <div className={`${styles.ServicesColSecond} col-md-5`}>
          <div>
           
            <h3>Unanswered Questions</h3>
            {unansweredQuestions.map((question, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  {question.description}
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    placeholder="Enter your answer"
                    multiline
                    value={answerInputs[index]}
                    onChange={(e) => handleAnswerInputChange(index, e.target.value)}
                    fullWidth
                  />
                  <button onClick={() => handleAnswerSubmit(index)}>Enter</button>
                </AccordionDetails>
              </Accordion>
            ))}

        
            <h3>Answered Questions</h3>
            {answeredQuestions.map((item, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + unansweredQuestions.length + 1}-content`}
                  id={`panel${index + unansweredQuestions.length + 1}-header`}
                >
                  {item.question.description}
                </AccordionSummary>
                <AccordionDetails>
                  <p>{item.answer}</p>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;

