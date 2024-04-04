import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import styles from "../Dashboard/dashboard.module.css";
import { contactAdvertisementOwner } from "../../apiHelpers"; // Import the helper function
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function Ads({ advertisements }) {
  const [selectedAdvertisement, setSelectedAdvertisement] = useState(null);

  useEffect(() => {
    // No need to fetch data here since it's passed as props
  }, []);

  const handlePostClick = (advertisement) => {
    setSelectedAdvertisement(advertisement);
  };

  const handleClose = () => {
    setSelectedAdvertisement(null);
  };

  const handleContact = () => {
    if (selectedAdvertisement) {
      // Constructing the request body
      const formData = {
        advertisementId: selectedAdvertisement.advertisementId,
        message: "Interested in this advertisement",
      };

      // Call the helper function to contact the advertisement owner
      contactAdvertisementOwner(formData);
    }
  };

  return (
    <div className={styles.userPostsContainer}>
      {advertisements.map((advertisement) => (
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
            <Button onClick={() => handlePostClick(advertisement)}>
              View Details
            </Button>
          </div>
        </Card>
      ))}
      <Dialog open={selectedAdvertisement !== null} onClose={handleClose}>
        <DialogContent dividers style={{ minWidth: 500 }}>
          {/* Display advertisement details in the dialog */}
          {selectedAdvertisement && (
            <>
              <Typography gutterBottom variant="h5" component="div">
                {selectedAdvertisement.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {"$" + selectedAdvertisement.price}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                <strong>Description:</strong>{" "}
                {selectedAdvertisement.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Creator:</strong> {selectedAdvertisement.displayName}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Location:</strong> {selectedAdvertisement.location}
              </Typography>
              {/* Map API integration */}
              <div style={{ height: 300, width: "100%" }}>
                <iframe
                  title="Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${selectedAdvertisement.location}`}
                  allowFullScreen
                ></iframe>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContact}>Contact</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Ads;
