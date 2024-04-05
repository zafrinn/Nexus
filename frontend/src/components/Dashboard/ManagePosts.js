import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  getAdminAdvertisementsByCategoryId,
  updateAdminAdvertisement,
} from "../../apiHelpers";
import styles from "./dashboard.module.css";

/**
 * ManagePosts component for displaying and managing advertisements by the admin.
 * @param {Object} props - Props passed to the component.
 */
function ManagePosts(props) {
  const [advertisements, setAdvertisements] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedAdvertisement, setEditedAdvertisement] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedEnabled, setEditedEnabled] = useState("true");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadAdvertisements();
  }, []);

  const loadAdvertisements = async () => {
    try {
      const category1Ads = await getAdminAdvertisementsByCategoryId(1);
      const category2Ads = await getAdminAdvertisementsByCategoryId(2);

      // Combine the advertisements from both categories
      const allAds = [...category1Ads, ...category2Ads];

      // Filter out duplicate advertisements based on advertisementId
      const uniqueAds = allAds.filter(
        (ad, index, self) =>
          index ===
          self.findIndex((a) => a.advertisementId === ad.advertisementId)
      );
      setAdvertisements(uniqueAds);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedData = {
      advertisementId: editedAdvertisement.advertisementId,
      title: editedTitle,
      description: editedDescription,
      price: parseFloat(editedPrice),
      location: editedLocation,
      categoryId: parseInt(editedCategory),
      enabled: editedEnabled === "true",
    };
    try {
      await updateAdminAdvertisement(editedData);
      handleClose();
      loadAdvertisements();
    } catch (error) {
      console.error("Error updating advertisement:", error);
    }
  };

  const handlePostClick = (advertisement) => {
    setOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredAdvertisements = advertisements.filter((advertisement) => {
    return (
      advertisement.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      advertisement.description
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <TextField
          placeholder="Search…"
          value={searchValue}
          onChange={handleSearchChange}
          fullWidth
          variant="outlined"
          style={{ width: 800 }}
        />
      </div>
      <div className={styles.userPostsContainer}>
        {filteredAdvertisements.map((advertisement) => (
          <Card
            key={advertisement.id}
            sx={{ position: "relative", maxWidth: 345 }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image={`data:image/${advertisement.posterMimeType};base64,${advertisement.poster}`}
              title="Advertisement"
              onClick={() => handlePostClick(advertisement)}
              style={{ cursor: "pointer" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {advertisement.title}
              </Typography>
              {advertisement.price && (
                <Typography variant="body2" color="text.secondary">
                  ${advertisement.price}
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
              <Stack direction="row" spacing={1}>
                {advertisement.category.categoryId === 2 && (
                  <Chip
                    label="Sale"
                    sx={{
                      backgroundColor: "#FBFFE1",
                      color: "#003FA7",
                      boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
                    }}
                  />
                )}
                {advertisement.category.categoryId === 1 && (
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
              <Button onClick={() => handleEditClick(advertisement)}>
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
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

export default ManagePosts;
