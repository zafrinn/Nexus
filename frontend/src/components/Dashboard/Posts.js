import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import styles from "./dashboard.module.css";
import {
  Card,
  CardContent,
  CardActions,
  Stack,
  Chip,
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
  const [editedEnabled, setEditedEnabled] = useState("true");

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
    setEditedEnabled(advertisement.enabled ? "true" : "false");
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
    setEditedEnabled("");
  };

  const handlePostClick = (contact) => {
    // Implement handlePostClick functionality here
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
      enabled: editedEnabled === "true",
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

  return (
    <div className={styles.userPostsContainer}>
      {advertisements.map((contact) => (
        <Card key={contact.id} sx={{ position: "relative", maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={`data:image/${contact.posterMimeType};base64,${contact.poster}`}
            title="Advertisement"
            onClick={() => handlePostClick(contact)}
            style={{ cursor: "pointer" }}
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px 16px",
            }}
          >
            <Button size="small" onClick={() => handleEditClick(contact)}>
              Edit
            </Button>
            <Stack direction="row" spacing={1}>
              {contact.category.categoryId === 1 && (
                <Chip
                  label="Sale"
                  sx={{
                    backgroundColor: "#FBFFE1",
                    color: "#003FA7",
                    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
                  }}
                />
              )}
              {contact.category.categoryId === 2 && (
                <Chip
                  label="Wanted"
                  sx={{
                    backgroundColor: "#E1F1FF",
                    color: "#003FA7",
                    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
                  }}
                />
              )}
            </Stack>
          </div>
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
              onChange={(e) => {
                const { value } = e.target;
                if (value >= 0) {
                  setEditedPrice(value);
                }
              }}
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
            <TextField
              select
              label="Enabled"
              value={editedEnabled}
              onChange={(e) => setEditedEnabled(e.target.value)}
              fullWidth
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            >
              <MenuItem value="true">Enabled</MenuItem>
              <MenuItem value="false">Disabled</MenuItem>
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
