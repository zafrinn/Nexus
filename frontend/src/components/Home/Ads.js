import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './home.module.css'; 
import databaseImage from '../../assets/car.jpg';
import { IoIosArrowForward } from "react-icons/io";
import { Card, CardContent, CardActions, CardMedia, Typography, Button, Dialog, DialogContent, DialogActions, TextField, MenuItem, DialogTitle, Badge, Stack, Chip } from '@mui/material';


function Ads(props) {
    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const data = props.data;

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPost(null);
    };

    return (
        <div className={styles.adsContainer}>
            {data.map((contact) => (
                 <Card key={contact.id} sx={{ position: 'relative', maxWidth: 345 }}>
                    <CardMedia
                        
                        sx={{ height: 140 }}
                        image={databaseImage}
                        title="green iguana"
                        onClick={() => handlePostClick(contact)}
                        style={{ cursor: 'pointer' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {contact.title} 
                            
                
                        </Typography>
                        
                        {contact.price && (
                            <Typography variant="body2" color="text.secondary">
                                ${contact.price}
                            </Typography>
                        )}
                    </CardContent>
                    <div style={{ position: 'absolute', bottom: 0, right: 0, margin: '10px' }}>
                        <Stack direction="row" spacing={1}>
                            {contact.category.categoryId === 2 && (
                                <Chip label="Sale" sx={{ backgroundColor: '#FBFFE1', color: '#003FA7', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)' }}/>
                            )}
                            {contact.category.categoryId  === 1 && (
                                <Chip label="Wanted" sx={{ backgroundColor: '#E1F1FF', color: '#003FA7', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)' }} />
                            )}
                        </Stack>
                    </div>
                </Card>
            ))}

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                  <div style={{ position: 'absolute', top: 0, right: 0, margin: '10px' }}>
                      <Stack direction="row" spacing={1}>
                          {selectedPost?.category.categoryId === 2 && (
                              <Chip label="Sale" sx={{ backgroundColor: '#FBFFE1', color: '#003FA7', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)' }} />
                          )}
                          {selectedPost?.category.categoryId  === 1  && (
                              <Chip label="Wanted"  sx={{ backgroundColor: '#E1F1FF', color: '#003FA7', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)' }} />
                          )}
                      </Stack>
                  </div>
                  <Typography variant="h5" gutterBottom>{selectedPost?.title}</Typography>
                  {selectedPost?.price && (
                            <Typography variant="body1" gutterBottom>Price: ${selectedPost?.price}</Typography>
                      )}
                  
                  <Typography variant="body1" gutterBottom>Location: {selectedPost?.location}</Typography>
                  <Typography variant="body1" gutterBottom>Description: {selectedPost?.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button>Contact</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Ads;
