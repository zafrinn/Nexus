import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './dashboard.module.css'; 
import TmuLogo from '../../assets/TMU_LOGO.png';
import databaseImage from '../../assets/car.jpg';
import mockData  from "./mockData/mockData.js";
import { IoIosArrowForward } from "react-icons/io";
import { Card, CardContent, CardActions, CardMedia, Typography, Button, Dialog, DialogContent, DialogActions, TextField, MenuItem, DialogTitle } from '@mui/material';


function UserPosts(props) {
    const data = props.data.posts;
    const [open, setOpen] = useState(false);
    const [editedPost, setEditedPost] = useState(null);
  
    const handleEditClick = (post) => {
      setEditedPost(post);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setEditedPost(null);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formElement = e.target;
      if (formElement.tagName !== 'FORM') {
        console.error('Expected form element, got:', formElement.tagName);
        return;
      }
      const formData = new FormData(formElement);
      const formDataObject = Object.fromEntries(formData.entries());
      const updatedData = { ...editedPost, ...formDataObject }; // Merge editedPost with form data
      props.onDataUpdate(updatedData); // Update the parent component's state with the updated data
      handleClose();
    };
  
    const generatePostsData = () => {
      const postsData = [];
      for (const postId in data) {
        const post = data[postId];
        postsData.push({
          id: post.id,
          title: post.title,
          price: post.price,
          location: post.location,
          category: post.category,
          description: post.description,
          picture: post.picture
        });
      }
      return postsData;
    };
  
    const Post = ({ id, title, price, location, category, description, picture }) => (
      <Card sx={{ maxWidth: 345, backgroundColor: '#FAFAFA' }}>
        <CardMedia
          sx={{ height: 140 }}
          image={databaseImage}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price}
          </Typography>
        </CardContent>
        <CardActions className={styles.userPostEditBtn}>
          <Button size="small" onClick={() => handleEditClick({ id, title, price, location, category, description, picture })}>Edit</Button>
        </CardActions>
      </Card>
    );
  
    return (
      <div className={styles.userPostsContainer}>
        {generatePostsData().map(post => (
          <Post key={post.id} {...post} />
        ))}
  
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                name="title"
                defaultValue={editedPost?.title}
                fullWidth
                autoFocus
                required
                style={{ marginTop: '5px', marginBottom: '10px' }}
              />
              <TextField
                label="Price"
                name="price"
                defaultValue={editedPost?.price}
                fullWidth
                autoFocus
                required
                style={{ marginTop: '5px', marginBottom: '10px' }}
              />
              <TextField
                label="Location"
                name="location"
                defaultValue={editedPost?.location}
                fullWidth
                autoFocus
                required
                style={{ marginTop: '5px', marginBottom: '10px' }}
              />
              <TextField
                label="Category"
                name="category"
                value={editedPost?.category || ''}
                fullWidth
                autoFocus
                required
                select
                style={{ marginTop: '5px', marginBottom: '10px' }}
              >
                {/* Menu items for categories */}
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Vehicles">Vehicles</MenuItem>
                <MenuItem value="Clothing & Accessories">Clothing & Accessories</MenuItem>
                <MenuItem value="Gardening">Gardening</MenuItem>
                <MenuItem value="Furniture">Furniture</MenuItem>
                <MenuItem value="Home Decor">Home Decor</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
              </TextField>
  
              <TextField
                label="Description"
                name="description"
                defaultValue={editedPost?.description}
                fullWidth
                multiline
                rows={4}
                required
                style={{ marginTop: '5px', marginBottom: '10px' }}
              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  
  
export default UserPosts;