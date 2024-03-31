import React, { useState } from 'react';
import styles from './messages.css'; 
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';


function MessagesPage() {
  const [newQuestion, setNewQuestion] = useState('');
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [answerInput, setAnswerInput] = useState('');

  const handleQuestionSubmit = () => {
    if (newQuestion.trim() !== '') {
      setUnansweredQuestions([...unansweredQuestions, newQuestion]);
      setNewQuestion('');
    }
  };

  const handleAnswerSubmit = (question) => {
    if (answerInput.trim() !== '') {
      const updatedUnansweredQuestions = unansweredQuestions.filter(q => q !== question);
      setUnansweredQuestions(updatedUnansweredQuestions);
      setAnsweredQuestions([...answeredQuestions, { question, answer: answerInput }]);
      setAnswerInput('');
    }
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
                  {question}
                </AccordionSummary>
                <AccordionDetails>
                  {/* Textarea for answering questions */}
                  <TextField
                    placeholder="Enter your answer"
                    multiline
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    fullWidth
                  />
                  <button onClick={() => handleAnswerSubmit(question)}>Enter</button>
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
                  {item.question}
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

