import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  getAdvertisementsByCategoryId,
  updateAdvertisement,
} from "../../apiHelpers";
import styles from "./dashboard.module.css"; // Import CSS styles

function ManagePosts(props) {
  const [advertisements, setAdvertisements] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedAdvertisement, setEditedAdvertisement] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  useEffect(() => {
    loadAdvertisements();
  }, []);

  const loadAdvertisements = async () => {
    try {
      const category1Ads = await getAdvertisementsByCategoryId(1);
      const category2Ads = await getAdvertisementsByCategoryId(2);
      setAdvertisements([...category1Ads, ...category2Ads]);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
      setAdvertisements([]);
    }
  };

  const handleEditClick = (advertisement) => {
    setEditedAdvertisement(advertisement);
    setEditedTitle(advertisement.title);
    setEditedDescription(advertisement.description);
    setEditedPrice(advertisement.price);
    setEditedLocation(advertisement.location);
    setEditedCategory(advertisement.category.categoryId.toString());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedAdvertisement(null);
    setEditedTitle("");
    setEditedDescription("");
    setEditedPrice("");
    setEditedLocation("");
    setEditedCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedData = {
      advertisementId: editedAdvertisement.advertisementId,
      title: editedTitle,
      description: editedDescription,
      price: parseFloat(editedPrice),
      location: editedLocation,
      categoryId: parseInt(editedCategory),
      enabled: "true",
    };
    try {
      await updateAdvertisement(editedData);
      handleClose();
      loadAdvertisements(); // Reload advertisements after update
    } catch (error) {
      console.error("Error updating advertisement:", error);
    }
  };

  return (
    <div className={styles.userPostsContainer}>
      {advertisements.map((advertisement) => (
        <Card
          key={advertisement.advertisementId}
          className={styles.advertisementCard}
        >
          <CardMedia
            component="img"
            image={`data:image/${advertisement.posterMimeType};base64,${advertisement.poster}`}
            alt="Advertisement"
            className={styles.advertisementImage}
          />
          <CardContent>
            <Typography variant="h6">{advertisement.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {advertisement.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ${advertisement.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {advertisement.location}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleEditClick(advertisement)}>
              Edit
            </Button>
          </CardActions>
        </Card>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              fullWidth
              autoFocus
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Price"
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              fullWidth
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              select
              label="Location"
              value={editedLocation}
              onChange={(e) => setEditedLocation(e.target.value)}
              fullWidth
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            >
              <MenuItem value="Toronto">Toronto</MenuItem>
              <MenuItem value="Mississauga">Mississauga</MenuItem>
              <MenuItem value="Brampton">Brampton</MenuItem>
              <MenuItem value="Markham">Markham</MenuItem>
              <MenuItem value="Vaughan">Vaughan</MenuItem>
              <MenuItem value="Oakville">Oakville</MenuItem>
              <MenuItem value="Richmond Hill">Richmond Hill</MenuItem>
              <MenuItem value="Scarborough">Scarborough</MenuItem>
              <MenuItem value="Etobicoke">Etobicoke</MenuItem>
              <MenuItem value="North York">North York</MenuItem>
              <MenuItem value="Ajax">Ajax</MenuItem>
              <MenuItem value="Pickering">Pickering</MenuItem>
            </TextField>
            <TextField
              select
              label="Category"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              fullWidth
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            >
              <MenuItem value="1">Items Wanted</MenuItem>
              <MenuItem value="2">Items for Sale</MenuItem>
            </TextField>
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

export default ManagePosts;
