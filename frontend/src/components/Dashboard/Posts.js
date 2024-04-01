import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import styles from "./dashboard.module.css";
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
  MenuItem, // Add MenuItem for dropdown
} from "@mui/material";
import { getAdvertisements, updateAdvertisement } from "../../apiHelpers"; // Import the getAdvertisements and updateAdvertisement functions

function UserPosts(props) {
  const [advertisements, setAdvertisements] = useState([]); // State to hold advertisements data
  const [open, setOpen] = useState(false);
  const [editedAdvertisement, setEditedAdvertisement] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedCategory, setEditedCategory] = useState(""); // Add state for edited category

  useEffect(() => {
    // Fetch advertisements data when component mounts
    getAdvertisements(setAdvertisements);
  }, []); // Empty dependency array to run the effect only once when component mounts

  const handleEditClick = (advertisement) => {
    setEditedAdvertisement(advertisement);
    setEditedTitle(advertisement.title);
    setEditedDescription(advertisement.description);
    setEditedPrice(advertisement.price);
    setEditedLocation(advertisement.location);
    setEditedCategory(advertisement.category.categoryId.toString()); // Set edited category
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
      categoryId: parseInt(editedCategory), // Parse category to integer
      enabled: "true",
    };
    try {
      await updateAdvertisement(editedData);
      // Handle success scenario
      handleClose();
      // Refresh advertisements data after update
      getAdvertisements(setAdvertisements);
    } catch (error) {
      // Handle error scenario
      console.error("Error updating advertisement:", error);
    }
  };

  const Advertisement = ({
    advertisementId,
    displayName,
    title,
    description,
    price,
    location,
    poster,
    posterMimeType,
    category,
  }) => {
    const getImageFormat = (mimeType) => {
      // Extract image format from the MIME type
      const formatRegex = /^image\/([a-z]+)$/;
      const match = formatRegex.exec(mimeType);
      return match ? match[1] : "jpeg"; // Default to "jpeg" if format is not found
    };

    return (
      <Card sx={{ maxWidth: 345, backgroundColor: "#FAFAFA" }}>
        <CardMedia
          sx={{ height: 140 }}
          component="img"
          image={`data:image/${getImageFormat(
            posterMimeType
          )};base64,${poster}`} // Display Base64 encoded image
          title="Advertisement Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${price}
          </Typography>
          {category && (
            <Typography variant="body2" color="text.secondary">
              Category: {category.name}
            </Typography>
          )}
        </CardContent>
        <CardActions className={styles.userPostEditBtn}>
          <Button
            size="small"
            onClick={() =>
              handleEditClick({
                advertisementId,
                displayName,
                title,
                description,
                price,
                location,
                poster,
                posterMimeType,
                category,
              })
            }
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <div className={styles.userPostsContainer}>
      {advertisements.map((advertisement) => (
        <Advertisement key={advertisement.advertisementId} {...advertisement} />
      ))}

      {/* Dialog for editing advertisements */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            {/* Form fields for editing advertisements */}
            <TextField
              label="Title"
              name="title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              fullWidth
              autoFocus
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Description"
              name="description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              fullWidth
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            {/* Location dropdown */}
            <TextField
              select
              label="Location"
              name="location"
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
            {/* Category dropdown */}
            <TextField
              select
              label="Category"
              name="categoryId"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              fullWidth
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            >
              <MenuItem value="1">Items Wanted</MenuItem> // Add Items Wanted
              option
              <MenuItem value="2">Items for Sale</MenuItem> // Add Items for
              Sale option
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

export default UserPosts;
