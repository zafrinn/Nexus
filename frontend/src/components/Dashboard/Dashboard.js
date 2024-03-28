import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './dashboard.module.css'; 
import TmuLogo from '../../assets/TMU_LOGO.png';
import databaseImage from '../../assets/car.jpg';
import mockData  from "./mockData/mockData.js";
import { IoIosArrowForward } from "react-icons/io";
import { Card, CardContent, CardActions, CardMedia, Typography, Button, Dialog, DialogContent, DialogActions, TextField, MenuItem, DialogTitle } from '@mui/material';
import UserPosts from './Posts.js';
import EditAccount from './EditAccount.js';
import ChangeUserPass from './ChangePass.js';
import FullFeaturedCrudGrid from './ManageUsers.js'
import students from './mockData/students.js'


function UserProfile(props){
  const data = props.data;

  return (
    <div className={styles.accountInfo}>
      <img src={TmuLogo} alt="Logo" className={styles.tmuLogo} />
      <div className={styles.account}>
        <h3 className= {styles.accountName}>{data.FName}&nbsp;{data.LName}</h3>
        <p className={styles.accountEmail} >{data.email}</p>
      </div>
      
    </div>
  );

};




function DashBoardNavBar2({ selectedTab, handleTabClick}) {
  return (
    <div className={styles.navbar}>
      <div className={`${styles.navItem} ${selectedTab === 'EditAccount' ? styles.active : ''}`}>
        <button onClick={() => handleTabClick('EditAccount')}>
          Account Info <span className={styles.arrow}><IoIosArrowForward /></span>
        </button>
      </div>
      <div className={`${styles.navItem} ${selectedTab === 'UserPosts' ? styles.active : ''}`}>
        <button onClick={() => handleTabClick('UserPosts')}>
          Posts  <span className={styles.arrow}><IoIosArrowForward /></span>
        </button>
      </div>
      <div className={`${styles.navItem} ${selectedTab === 'ChangeUserPass' ? styles.active : ''}`}>
        <button onClick={() => handleTabClick('ChangeUserPass')}>
          Change Password <span className={styles.arrow}><IoIosArrowForward /></span>
        </button>
      </div>
    </div>
  );
}

function DashBoardNavBar({ selectedTab, handleTabClick, isAdmin}) {

  return (
    <div className={styles.navbar}>
      <div className={`${styles.navItem} ${selectedTab === 'EditAccount' ? styles.active : ''}`}>
        <button onClick={() => handleTabClick('EditAccount')}>
          Account Info <span className={styles.arrow}><IoIosArrowForward /></span>
        </button>
      </div>
      {isAdmin && (
        <div className={`${styles.navItem} ${selectedTab === 'Users' ? styles.active : ''}`}>
          <button onClick={() => handleTabClick('Users')}>
            Users <span className={styles.arrow}><IoIosArrowForward /></span>
          </button>
        </div>
      )}
      <div className={`${styles.navItem} ${selectedTab === 'Posts' ? styles.active : ''}`}>
        <button onClick={() => handleTabClick('Posts')}>
          {isAdmin ? 'Manage Ads' : 'Posts'} <span className={styles.arrow}><IoIosArrowForward /></span>
        </button>
      </div>
      <div className={`${styles.navItem} ${selectedTab === 'ChangeUserPass' ? styles.active : ''}`}>
        <button onClick={() => handleTabClick('ChangeUserPass')}>
         Change Password <span className={styles.arrow}><IoIosArrowForward /></span>
        </button>
      </div>
    </div>
  );
}






function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('EditAccount');
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
                isAdmin={data.isAdmin}
      
              />
            </div>
          </div>
        </div>


        <div className={`${styles.dashBoardColSecond} col-md-9`}>
          {selectedTab === 'EditAccount' && <EditAccount  data={data} />}
          {selectedTab === 'Posts' && <UserPosts data={data} />}
          {selectedTab === 'ChangeUserPass' && <ChangeUserPass  data={data} />}
          {data.isAdmin && selectedTab === 'Posts' &&  <UserPosts data={data} />}
          {data.isAdmin && selectedTab === 'Users' && <FullFeaturedCrudGrid data={students}/>}
        </div>
      </div>
    </div>
  );
}

function AdminTab(){
  return(
    <h1>ADMIN</h1>
  )
}

function AnotherAdminTab(){
  return(
    <h1>ADMIN</h1>
  )
}



export default Dashboard;

