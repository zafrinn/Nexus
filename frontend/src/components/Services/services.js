import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './services.module.css'; 
import TmuLogo from '../../assets/TMU_LOGO.png';
import databaseImage from '../../assets/car.jpg';
//import mockData  from "./mockData/mockData.js";
import { IoIosArrowForward } from "react-icons/io";
import { Card, CardContent, CardActions, CardMedia, Typography, Button, Dialog, DialogContent, DialogActions, TextField, MenuItem, DialogTitle } from '@mui/material';
import UserTutoring from './Tutoring.js';
import TextBookExchange from './TextBookExchange.js';
import Tutoring from './Tutoring.js';
import StudyGroups from './StudyGroups.js';
//import students from './mockData/students.js'



function ServicesNavBar({ selectedTab, handleTabClick, isAdmin}) {

  return (
    <div className={styles.navbar}>
      <div className={`${styles.navItem} ${selectedTab === 'TextBookExchange' ? styles.active : ''}`}>
        <button onClick={() => handleTabClick('TextBookExchange')}>
          TextBook Exchange<span className={styles.arrow}><IoIosArrowForward /></span>
        </button>
      </div>
        <div className={`${styles.navItem} ${selectedTab === 'StudyGroups' ? styles.active : ''}`}>
          <button onClick={() => handleTabClick('StudyGroups')}>
            Study Groups <span className={styles.arrow}><IoIosArrowForward /></span>
          </button>
        </div>
      <div className={`${styles.navItem} ${selectedTab === 'Tutoring' ? styles.active : ''}`}>
        <button onClick={() => handleTabClick('Tutoring')}>
           Tutoring <span className={styles.arrow}><IoIosArrowForward /></span>
        </button>
      </div>
    </div>
  );
}







function ServicesPage() {
  const [selectedTab, setSelectedTab] = useState("TextBookExchange");
  const data = "null";

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };



  return (
    <div className={`${styles.ServicesContainer} container`}>
      <div className={`${styles.ServicesRow} row`}>
        <div className={`${styles.dashBoardColFirst} col-md-3`}>
          <div className={styles.colorBackground}>
            <div className={`${styles.navigation}s`}>
              <ServicesNavBar
                selectedTab={selectedTab}
                handleTabClick={handleTabClick}
              />
            </div>
          </div>
        </div>


        <div className={`${styles.ServicesColSecond} col-md-9`}>
          {selectedTab === 'TextBookExchange' && <TextBookExchange  data={data} />}
          {selectedTab === 'Tutoring' && <Tutoring data={data} />}
          {selectedTab === 'StudyGroups' && <StudyGroups  data={data} />}
        </div>
      </div>
    </div>
  );
}

export default ServicesPage; 


