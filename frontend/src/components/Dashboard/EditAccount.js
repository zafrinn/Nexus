import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './dashboard.module.css'; 
import TmuLogo from '../../assets/TMU_LOGO.png';
import databaseImage from '../../assets/car.jpg';
import mockData  from "./mockData/mockData.js";
import { IoIosArrowForward } from "react-icons/io";
import { Card, CardContent, CardActions, CardMedia, Typography, Button, Dialog, DialogContent, DialogActions, TextField, MenuItem, DialogTitle } from '@mui/material';


function EditAccount(props) {
    const { data } = props;
    const [open, setOpen] = useState(false);
    const [editedData, setEditedData] = useState(data);
  
    const handleEditClick = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDelete = () => {
      alert("Are you sure you want to delete your account?")
    };
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formElement = e.target;
      if (formElement instanceof HTMLFormElement) {
        const formData = new FormData(formElement);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log('New Account Info: ', formDataObject);
        setEditedData(formDataObject);
      }
      handleClose();
    };
  
    return (
      <div >
        <h1 className={styles.EditAccountHeading}>Account Info</h1>
        <Card sx={{ maxWidth: 345, backgroundColor: '#FAFAFA', borderRadius:'20px' }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" className={styles.EditAccountLabel}>
            <strong>First Name:</strong> {editedData.FName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" className={styles.EditAccountLabel}>
            <strong>Last Name:</strong> {editedData.LName}
          </Typography>
          <Typography variant="body2" color="text.secondary" className={styles.EditAccountLabel}>
            <strong>Email Address:</strong> {editedData.email}
          </Typography>
        </CardContent>
          <CardActions className={styles.EditAccountBtn}>
            <Button size="small" onClick={handleEditClick}>Edit</Button>
          </CardActions>
        </Card>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                name="FName"
                defaultValue={editedData.FName}
                fullWidth
                autoFocus
                required
                style={{ marginTop: '5px', marginBottom: '10px' }}
              />
              <TextField
                label="Last Name"
                name="LName"
                defaultValue={editedData.LName}
                fullWidth
                required
                style={{ marginTop: '5px', marginBottom: '10px' }}
              />
              <TextField
                label="Email Address"
                name="email"
                defaultValue={editedData.email}
                fullWidth
                required
                InputProps={{
                  pattern: '^[a-zA-Z0-9._%+-]+@torontomu\\.ca$',
                }}
                style={{ marginTop: '5px', marginBottom: '10px' }}
              />
  
              <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="inherit">Cancel</Button>
                <Button onClick={handleDelete} variant="outlined" color="secondary">Delete</Button>
                <Button type="submit" variant="contained" >Save</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  
export default EditAccount;  