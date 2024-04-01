import React, { useState } from "react";
import styles from "./dashboard.module.css";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { updateUserAccount } from "../../apiHelpers";

function EditAccount({ data, updateUser }) {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState(data);

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElement = e.target;
    if (formElement instanceof HTMLFormElement) {
      const formData = new FormData(formElement);
      const formDataObject = Object.fromEntries(formData.entries());

      // Preserve the roleName property from the original data
      formDataObject.roleName = data.roleName;

      updateUserAccount(formDataObject).then(() => {
        // After updating, merge the new data with the original data to preserve roleName
        const updatedUserData = { ...data, ...formDataObject };
        updateUser(updatedUserData);
      });
    }
    handleClose();
  };

  return (
    <div>
      <h1 className={styles.EditAccountHeading}>Account Info</h1>
      <Card
        sx={{ maxWidth: 345, backgroundColor: "#FAFAFA", borderRadius: "20px" }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className={styles.EditAccountLabel}
          >
            <strong>Username:</strong> {data.displayName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.EditAccountLabel}
          >
            <strong>Email Address:</strong> {data.emailAddress}
          </Typography>
        </CardContent>
        <CardActions className={styles.EditAccountBtn}>
          <Button size="small" onClick={handleEditClick}>
            Edit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="displayName"
              defaultValue={data.displayName}
              fullWidth
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Email Address"
              name="emailAddress"
              defaultValue={data.emailAddress}
              fullWidth
              required
              InputProps={{
                pattern: "^[a-zA-Z0-9._%+-]+@torontomu\\.ca$",
              }}
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <DialogActions>
              <Button onClick={handleClose} variant="outlined" color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditAccount;
