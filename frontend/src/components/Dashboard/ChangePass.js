import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './dashboard.module.css'; 
import TmuLogo from '../../assets/TMU_LOGO.png';
import databaseImage from '../../assets/car.jpg';
import mockData  from "./mockData/mockData.js";
import { IoIosArrowForward } from "react-icons/io";
import { Card, CardContent, CardActions, CardMedia, Typography, Button, Dialog, DialogContent, DialogActions, TextField, MenuItem, DialogTitle } from '@mui/material';


function ChangeUserPass(props) {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChangePassword = (e) => {
      e.preventDefault();
      const form = e.target;
      const oldPassword = form.oldPassword.value;
      const newPassword = form.newPassword.value;
      const confirmNewPassword = form.confirmNewPassword.value;
    
      let newErrors = {};
    
      // Perform validation
      if (oldPassword.trim() === '') {
        newErrors.oldPassword = 'Old password is required';
      }
  
      if (newPassword.trim() === '') {
        newErrors.newPassword = 'New password is required';
      }
  
      if (confirmNewPassword.trim() === '') {
        newErrors.confirmNewPassword = 'Confirm New Password is required';
      }
  
      if (newPassword.trim() !== confirmNewPassword.trim()) {
        newErrors.confirmNewPassword = 'Passwords don\'t match.';
      }
      // Add more validation rules as needed...
    
      // Update errors state
      setErrors(newErrors);
    
      // If there are no errors, proceed with handling the password change
      if (Object.keys(newErrors).length === 0) {
        // Perform password change logic here
        console.log("Old Password:", oldPassword);
        console.log("New Password:", newPassword);
        console.log("Confirm New Password:", confirmNewPassword);
    
        handleClose();
      }
    };
    return (
      <div>
        <Card className={styles.changePassContainer}>
          <CardContent className={styles.changePassBtn} >
            <h1>Change Password</h1>
            <Button onClick={handleOpen} variant="contained" >Change Password</Button>
          </CardContent>
        </Card>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <form onSubmit={handleChangePassword}>
              <TextField
                autoFocus
                margin="dense"
                name="oldPassword"
                label="Old Password"
                type="password"
                fullWidth
                required
                error={Boolean(errors.oldPassword)}
                helperText={errors.oldPassword}
              />
              <TextField
                margin="dense"
                name="newPassword"
                label="New Password"
                type="password"
                fullWidth
                required
                error={Boolean(errors.newPassword)}
                helperText={errors.newPassword}
              />
              <TextField
                margin="dense"
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                fullWidth
                required
                error={Boolean(errors.confirmNewPassword)}
                helperText={errors.confirmNewPassword}
              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">Change Password</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

export default ChangeUserPass;