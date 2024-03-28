import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import styles from "./dashboard.module.css";
import TmuLogo from "../../assets/TMU_LOGO.png";
import databaseImage from "../../assets/car.jpg";
import mockData from "./mockData.js";
import { IoIosArrowForward } from "react-icons/io";
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
  DialogTitle,
} from "@mui/material";
import axios from "axios";

function UserProfile(props) {
  const data = props.data;

  return (
    <div className={styles.accountInfo}>
      <img src={TmuLogo} alt="Logo" className={styles.tmuLogo} />
      <div className={styles.account}>
        <h3 className={styles.accountName}>
          {data.FName}&nbsp;{data.LName}
        </h3>
        <p className={styles.accountEmail}>{data.email}</p>
      </div>
    </div>
  );
}

function EditAccount(props) {
  const { data } = props;
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState(data);

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    alert("Are you sure you want to delete your account?");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElement = e.target;
    if (formElement instanceof HTMLFormElement) {
      const formData = new FormData(formElement);
      const formDataObject = Object.fromEntries(formData.entries());
      console.log("New Account Info: ", formDataObject);
      setEditedData(formDataObject);
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
            <strong>First Name:</strong> {editedData.FName}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className={styles.EditAccountLabel}
          >
            <strong>Last Name:</strong> {editedData.LName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.EditAccountLabel}
          >
            <strong>Email Address:</strong> {editedData.email}
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
              label="First Name"
              name="FName"
              defaultValue={editedData.FName}
              fullWidth
              autoFocus
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Last Name"
              name="LName"
              defaultValue={editedData.LName}
              fullWidth
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Email Address"
              name="email"
              defaultValue={editedData.email}
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
              <Button
                onClick={handleDelete}
                variant="outlined"
                color="secondary"
              >
                Delete
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

function UserPosts2(props) {
  const data = props.data.posts;
  const [open, setOpen] = useState(false);
  const [editedPost, setEditedPost] = useState(data);

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
    if (formElement.tagName !== "FORM") {
      console.error("Expected form element, got:", formElement.tagName);
      return;
    }
    const formData = new FormData(formElement);
    const formDataObject = Object.fromEntries(formData.entries());
    const updatedData = { ...editedPost, ...formDataObject }; // Merge editedPost with form data
    setEditedPost(updatedData); // Update the state with the updated data
    console.log("Updated Post: ", formDataObject);
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
        picture: post.picture,
      });
    }
    return postsData;
  };

  const Post = ({
    id,
    title,
    price,
    location,
    category,
    description,
    picture,
  }) => (
    <Card sx={{ maxWidth: 345, backgroundColor: "#FAFAFA" }}>
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
          {description}
        </Typography>
      </CardContent>
      <CardActions className={styles.userPostEditBtn}>
        <Button
          size="small"
          onClick={() =>
            handleEditClick({
              id,
              title,
              price,
              location,
              category,
              description,
              picture,
            })
          }
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <div className={styles.userPostsContainer}>
      {generatePostsData().map((post) => (
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
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Price"
              name="price"
              defaultValue={editedPost?.price}
              fullWidth
              autoFocus
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Location"
              name="location"
              defaultValue={editedPost?.location}
              fullWidth
              autoFocus
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Category"
              name="category"
              value={editedPost?.category || ""}
              fullWidth
              autoFocus
              required
              select
              style={{ marginTop: "5px", marginBottom: "10px" }}
            >
              {/* Menu items for categories */}
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Vehicles">Vehicles</MenuItem>
              <MenuItem value="Clothing & Accessories">
                Clothing & Accessories
              </MenuItem>
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
              style={{ marginTop: "5px", marginBottom: "10px" }}
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

function UserPosts(props) {
  const data = props.data.posts;
  const [open, setOpen] = useState(false);
  const [editedPost, setEditedPost] = useState(data);

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
    if (formElement.tagName !== "FORM") {
      console.error("Expected form element, got:", formElement.tagName);
      return;
    }
    const formData = new FormData(formElement);
    const formDataObject = Object.fromEntries(formData.entries());
    const updatedData = { ...editedPost, ...formDataObject }; // Merge editedPost with form data
    console.log("here:", updatedData);
    setEditedPost(updatedData); // Update the state with the updated data
    console.log("Updated Post: ", formDataObject);
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
        picture: post.picture,
      });
    }
    return postsData;
  };

  const Post = ({
    id,
    title,
    price,
    location,
    category,
    description,
    picture,
  }) => (
    <Card sx={{ maxWidth: 345, backgroundColor: "#FAFAFA" }}>
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
          {description}
        </Typography>
      </CardContent>
      <CardActions className={styles.userPostEditBtn}>
        <Button
          size="small"
          onClick={() =>
            handleEditClick({
              id,
              title,
              price,
              location,
              category,
              description,
              picture,
            })
          }
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <div className={styles.userPostsContainer}>
      {generatePostsData().map((post) => (
        <Post key={post.id} {...post} />
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              defaultValue={editedPost?.title}
              onChange={(e) =>
                setEditedPost({ ...editedPost, title: e.target.value })
              }
              fullWidth
              autoFocus
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Price"
              name="price"
              defaultValue={editedPost?.price}
              fullWidth
              autoFocus
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Location"
              name="location"
              defaultValue={editedPost?.location}
              fullWidth
              autoFocus
              required
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
            <TextField
              label="Category"
              name="category"
              value={editedPost?.category || ""}
              fullWidth
              autoFocus
              required
              select
              style={{ marginTop: "5px", marginBottom: "10px" }}
            >
              {/* Menu items for  categories */}
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Vehicles">Vehicles</MenuItem>
              <MenuItem value="Clothing & Accessories">
                Clothing & Accessories
              </MenuItem>
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
              style={{ marginTop: "5px", marginBottom: "10px" }}
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

function ChangeUserPass(props) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
    if (oldPassword.trim() === "") {
      newErrors.oldPassword = "Old password is required";
    }

    if (newPassword.trim() === "") {
      newErrors.newPassword = "New password is required";
    }

    if (confirmNewPassword.trim() === "") {
      newErrors.confirmNewPassword = "Confirm New Password is required";
    }

    if (newPassword.trim() !== confirmNewPassword.trim()) {
      newErrors.confirmNewPassword = "Passwords don't match.";
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
        <CardContent className={styles.changePassBtn}>
          <h1>Change Password</h1>
          <Button onClick={handleOpen} variant="contained">
            Change Password
          </Button>
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
              <Button type="submit" variant="contained" color="primary">
                Change Password
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DashBoardNavBar({ selectedTab, handleTabClick }) {
  return (
    <div className={styles.navbar}>
      <div
        className={`${styles.navItem} ${
          selectedTab === "EditAccount" ? styles.active : ""
        }`}
      >
        <button onClick={() => handleTabClick("EditAccount")}>
          Account Info{" "}
          <span className={styles.arrow}>
            <IoIosArrowForward />
          </span>
        </button>
      </div>
      <div
        className={`${styles.navItem} ${
          selectedTab === "UserPosts" ? styles.active : ""
        }`}
      >
        <button onClick={() => handleTabClick("UserPosts")}>
          Posts{" "}
          <span className={styles.arrow}>
            <IoIosArrowForward />
          </span>
        </button>
      </div>
      <div
        className={`${styles.navItem} ${
          selectedTab === "ChangeUserPass" ? styles.active : ""
        }`}
      >
        <button onClick={() => handleTabClick("ChangeUserPass")}>
          Change Password{" "}
          <span className={styles.arrow}>
            <IoIosArrowForward />
          </span>
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("EditAccount");
  const data = mockData;

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className={`${styles.dashboardConatiner} container`}>
      <div className={`${styles.DashboardRow} row`}>
        <div className={`${styles.dashBoardColFirst} col-md-3`}>
          <div className={styles.colorBackground}>
            <div className={`${styles.accountDisplay}`}>
              <UserProfile data={data} />
            </div>
            <div className={`${styles.navigation}s`}>
              <DashBoardNavBar
                selectedTab={selectedTab}
                handleTabClick={handleTabClick}
              />
            </div>
          </div>
        </div>

        <div className={`${styles.dashBoardColSecond} col-md-9`}>
          {selectedTab === "EditAccount" && <EditAccount data={data} />}
          {selectedTab === "UserPosts" && <UserPosts data={data} />}
          {selectedTab === "ChangeUserPass" && <ChangeUserPass data={data} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
