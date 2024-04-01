import styles from './services.module.css';
import React, { useState } from 'react';


import { TextField, Button, Grid, Paper } from '@mui/material';



function ExchangeTable(props) {
  const data = props.data
    const[contacts, setContacts] = useState(data);
    const [addFormData, setAddFormData] = useState(
      { title: "",
       ISBN: "",
       user: "",
       location: ""
       }
     )

     const handleAddFormChange = (e) => {
      e.preventDefault();
      const fieldName = e.target.getAttribute('name');
      const fieldValue = e.target.value;
    
      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;
    
      setAddFormData(newFormData);
    };
    

     const handleSubmit = (e) => {
       e.preventDefault();
       const newContact = {
         title: addFormData.title,
         ISBN: addFormData.ISBN,
         user : addFormData.user,
         location: addFormData.location
       };
   
       const newContacts = [...contacts, newContact];
       setContacts(newContacts);
     };

    const handleActionClick = (contactId) => {
        // Define your action logic here, such as opening a modal, navigating to a page, etc.
        console.log(`Clicked action button for contact with ID: ${contactId}`);
    };
    return (
      <>
      <div className={styles.TxtExchangeForm}>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <Paper elevation={3} style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="title"
                    name = "title"
                    label="Title"
                    variant="outlined"
                    margin="normal"
                    required
                    onChange={handleAddFormChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="ISBN"
                    name = "ISBN"
                    label="ISBN"
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
                    name = "user"
                    label="User"
                    variant="outlined"
                    margin="normal"
                    required
                    onChange={handleAddFormChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    id="location"
                    name = "location" 
                    label="Location"
                    variant="outlined"
                    margin="normal"
                    required
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
        <div className={styles.TxtExchangeTable}>
          <table className={styles.responsiveTable}>
            <thead className={styles.tableHeader}>
                <tr className={styles.tableRow}>
                    <th className={`${styles.col} ${styles['col-1']}`}>Textbook Exchange</th>
                    <th className={`${styles.col} ${styles['col-2']}`}>ISBN</th>
                    <th className={`${styles.col} ${styles['col-3']}`}>User</th>
                    <th className={`${styles.col} ${styles['col-4']}`}>Location</th>
                    <th className={`${styles.col} ${styles['col-5']}`}>Action</th>
                </tr>
            </thead>
            <tbody>
                { contacts.map((contact) => (
                     <tr>
                     <td className={`${styles.col} ${styles['col-1']}`}>{contact.title}</td>
                     <td className={`${styles.col} ${styles['col-2']}`}>{contact.ISBN}</td>
                     <td className={`${styles.col} ${styles['col-3']}`}>{contact.user}</td>
                     <td className={`${styles.col} ${styles['col-4']}`}>{contact.location}</td>
                     <td className={`${styles.col} ${styles['col-5']}`}>
                        <button className={styles.exchangeBtn} role="button" onClick={() => handleActionClick(contact.id)}>Exchange</button>
                    </td>
                 </tr>
                ))}
                

            </tbody>
          </table>
        </div>
        </>
    );
  }
  
  export default ExchangeTable;