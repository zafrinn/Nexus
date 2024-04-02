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
import { getAdvertisementsByCategoryId } from "../../apiHelpers";
import styles from "../Dashboard/dashboard.module.css";

function Ads({ advertisements }) {
  const [selectedAdvertisement, setSelectedAdvertisement] = useState(null);

  useEffect(() => {
    // No need to fetch data here since it's passed as props
  }, []);

  const handlePostClick = (advertisement) => {
    console.log(advertisement);
    setSelectedAdvertisement(advertisement);
  };

  const handleClose = () => {
    setSelectedAdvertisement(null);
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
          </div>
        </Card>
      ))}
      <Dialog open={selectedAdvertisement !== null} onClose={handleClose}>
        <DialogContent>
          {/* Display advertisement details in the dialog */}
          {selectedAdvertisement && (
            <>
              <Typography gutterBottom variant="h5" component="div">
                {selectedAdvertisement.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {"$" + selectedAdvertisement.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description:
                <br></br>
                {selectedAdvertisement.description}
              </Typography>
              <br></br>
              <Typography variant="body2" color="text.secondary">
                Creator: {selectedAdvertisement.displayName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {selectedAdvertisement.location}
              </Typography>
              <CardMedia
                sx={{ height: 140 }}
                image={`data:image/${selectedAdvertisement.posterMimeType};base64,${selectedAdvertisement.poster}`}
                title="Advertisement"
                style={{ marginTop: 10 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Ads;
