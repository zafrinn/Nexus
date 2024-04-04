import React, { useState, useEffect } from 'react';
import styles from './messages.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import { getDiscussionList, createDiscussion, createDiscussionReply } from "../../apiHelpers";

function MessagesPage() {
  const [newQuestion, setNewQuestion] = useState('');
  const [newReply, setNewReply] = useState('');
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    getDiscussionList((data) => {
      // Process the data and separate into unanswered and answered questions
      let ansQ = [];
      let unansQ = [];

      data.forEach(question => {
        let q = {
          "discussion_id": question.discussionId,
          "description": question.description,
          "created_timestamp": question.createdTimestamp,
          "updated_timestamp": question.updatedTimestamp,
          "display_name": question.displayName,
          "discussion_reply_id": question.discussionReplyId,
          "reply": question.reply,
          "reply_created_timestamp": question.replyCreatedTimestamp,
          "reply_updated_timestamp": question.replyUpdatedTimestamp,
          "reply_display_name": question.replyDisplayName,
        }

        if (question.discussionReplyId === null) {
          unansQ.push(q);
        } else {
          ansQ.push(q);
        }
      });

      setUnansweredQuestions(unansQ);
      setAnsweredQuestions(ansQ);
    });
  }, []);

  const handleQuestionSubmit = async () => {
    if (newQuestion.trim() !== '') {
      const newQuestionObj = {
        description: newQuestion
      };

      let { success, message } = await createDiscussion(JSON.stringify(newQuestionObj));

      if (!success) {
        alert(message);
      }

      setNewQuestion('');
      getDiscussionList((data) => {
        // Process the data and separate into unanswered and answered questions
        let ansQ = [];
        let unansQ = [];

        data.forEach(question => {
          let q = {
            "discussion_id": question.discussionId,
            "description": question.description,
            "created_timestamp": question.createdTimestamp,
            "updated_timestamp": question.updatedTimestamp,
            "display_name": question.displayName,
            "discussion_reply_id": question.discussionReplyId,
            "reply": question.reply,
            "reply_created_timestamp": question.replyCreatedTimestamp,
            "reply_updated_timestamp": question.replyUpdatedTimestamp,
            "reply_display_name": question.replyDisplayName,
          }

          if (question.discussionReplyId === null) {
            unansQ.push(q);
          } else {
            ansQ.push(q);
          }
        });

        setUnansweredQuestions(unansQ);
        setAnsweredQuestions(ansQ);
      });
    }
  };

  const handleAnswerSubmit = async (discussion_id) => {

    if (newReply.trim() !== '') {
      const newReplyObj = {
        discussionId: discussion_id,
        reply: newReply
      };

      let { success, message } = await createDiscussionReply(JSON.stringify(newReplyObj));

      if (!success) {
        alert(message);
      }
     
      getDiscussionList((data) => {
        // Process the data and separate into unanswered and answered questions
        let ansQ = [];
        let unansQ = [];

        data.forEach(question => {
          let q = {
            "discussion_id": question.discussionId,
            "description": question.description,
            "created_timestamp": question.createdTimestamp,
            "updated_timestamp": question.updatedTimestamp,
            "display_name": question.displayName,
            "discussion_reply_id": question.discussionReplyId,
            "reply": question.reply,
            "reply_created_timestamp": question.replyCreatedTimestamp,
            "reply_updated_timestamp": question.replyUpdatedTimestamp,
            "reply_display_name": question.replyDisplayName,
          }

          if (question.discussionReplyId === null) {
            unansQ.push(q);
          } else {
            ansQ.push(q);
          }
        });

        setUnansweredQuestions(unansQ);
        setAnsweredQuestions(ansQ);
      });
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
                  {question.description}
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    placeholder="Enter your answer"
                    multiline
                    onChange={(e) => setNewReply(e.target.value)}
                    fullWidth
                  />
                  <button onClick={() => handleAnswerSubmit(question.discussion_id)}>Enter</button>
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
                  {item.description}
                </AccordionSummary>
                <AccordionDetails>
                  <hr></hr>
                  <p>{item.reply}</p>
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

