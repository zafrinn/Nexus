import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import styles from "./dashboard.module.css";
import adminPic from "../../assets/admin_user.jpg";
import studentPic from "../../assets/basic_user.jpg";
import { IoIosArrowForward } from "react-icons/io";
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
import UserPosts from "./Posts.js";
import EditAccount from "./EditAccount.js";
import ChangeUserPass from "./ChangePass.js";
import FullFeaturedCrudGrid from "./ManageUsers.js";
import ManagePosts from "./ManagePosts.js"; // Import ManagePosts component
import { getUserInformation, logoutUser } from "../../apiHelpers.js";
import { useNavigate } from "react-router-dom";

function UserProfile({ data }) {
  const userProfilePic = data.roleName === "Admin" ? adminPic : studentPic;

  return (
    <div className={styles.accountInfo}>
      <div className={styles.account}>
        <img
          src={userProfilePic}
          alt="Profile"
          className={`${styles.profilePic} ${styles.smallProfilePic}`}
        />
        <h3 className={styles.accountName}>{data.displayName}</h3>
        <p className={styles.accountEmail}>{data.emailAddress}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("EditAccount");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/"); 
    }
  }, [navigate]);
  

  useEffect(() => {
    // Fetch user information
    getUserInformation(setUserData);
  }, []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  
  const handleLogout = () => {
    // Logout user
    logoutUser();
    navigate("/");
  };

  const updateUser = (updatedData) => {
    setUserData(updatedData);
  };

  return (
    <div className={`${styles.dashboardContainer} container`}>
      <div className={`${styles.DashboardRow} row`}>
        <div className={`${styles.dashBoardColFirst} col-md-3`}>
          <div className={styles.colorBackground}>
            <div className={`${styles.accountDisplay}`}>
              {userData && <UserProfile data={userData} />}
            </div>
            <div className={`${styles.navigation}s`}>
              {/* Pass isAdmin property to DashboardNavBar */}
              <DashBoardNavBar
                selectedTab={selectedTab}
                handleTabClick={handleTabClick}
                isAdmin={userData && userData.roleName === "Admin"}
                handleLogout={handleLogout}
              />
            </div>
          </div>
        </div>

        <div className={`${styles.dashBoardColSecond} col-md-9`}>
          {/* Render components based on selected tab */}
          {selectedTab === "EditAccount" && userData && (
            <EditAccount data={userData} updateUser={updateUser} />
          )}
          {selectedTab === "Posts" &&
            userData &&
            (userData.roleName !== "Admin" ? (
              <UserPosts data={userData} />
            ) : (
              <ManagePosts data={userData} />
            ))}
          {selectedTab === "ChangeUserPass" && (
            <ChangeUserPass data={userData} />
          )}
          {userData &&
            userData.roleName === "Admin" &&
            selectedTab === "Users" && <FullFeaturedCrudGrid />}
        </div>
      </div>
    </div>
  );
}

function DashBoardNavBar({
  selectedTab,
  handleTabClick,
  isAdmin,
  handleLogout,
}) {
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
      {isAdmin && (
        <div
          className={`${styles.navItem} ${
            selectedTab === "Users" ? styles.active : ""
          }`}
        >
          <button onClick={() => handleTabClick("Users")}>
            Users{" "}
            <span className={styles.arrow}>
              <IoIosArrowForward />
            </span>
          </button>
        </div>
      )}
      <div
        className={`${styles.navItem} ${
          selectedTab === "Posts" ? styles.active : ""
        }`}
      >
        <button onClick={() => handleTabClick("Posts")}>
          {isAdmin ? "Manage Ads" : "Posts"}{" "}
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
  <Button style={{ backgroundColor: '#d73644', border: 'none', cursor: 'pointer', padding: '10px', textAlign: 'center', width: '60%', borderRadius: '5px', fontSize: '15px', fontFamily: 'Poppins, sans-serif', color: '#ffffff' }} onClick={handleLogout}>Logout</Button>
</div>

    </div>
  );
}

export default Dashboard;
