import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './home.module.css'; 
import { IoIosArrowForward } from "react-icons/io";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import data from './HomeMockData.json'
import Ads from './Ads.js';
import { FormControlLabel, Switch } from '@mui/material';
import Button from '@mui/material/Button';
import TmuLogo from '../../assets/TMU_LOGO.png';


import { Select, MenuItem } from '@mui/material';


const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.primary.main}`,
  boxShadow: '2px 2px 5px #A9A9A9',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function SearchAd() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Search value:', searchValue);
    // Perform search operations using the searchValue state
  };

  return (
    <div className={styles.searchBar} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent', width: '70%', marginLeft:'150px'}}>
      <Search component="form" onSubmit={handleSearchSubmit} style={{ flex: '1',  margin: '0px' }}>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
          onChange={handleSearchChange}
          style = {{ padding:'5px' }}
        />
      </Search>
      <Button
        type="submit"
        style={{marginLeft: '10px', width:'40px', paddingTop:'11px', paddingBottom:'11px' }}
      >
        <SearchIcon  style={{ fill: '#003FA7' }} fontSize="large" />
      </Button>
    </div>
  );
  
}


function ItemSwitches() {
  const [itemsWanted, setItemsWanted] = useState(false);
  const [itemsForSale, setItemsForSale] = useState(false);

  const handleItemsWantedChange = (event) => {
    setItemsWanted(event.target.checked);
  };

  const handleItemsForSaleChange = (event) => {
    setItemsForSale(event.target.checked);
  };

  return (
    <div className={styles.filterCard}   style={{ display: 'flex' , flexDirection: 'column'}}>
      <FormControlLabel
        control={<Switch checked={itemsWanted} onChange={handleItemsWantedChange}  sx={{ '& .MuiSwitch-track': { bgcolor: '#003FA7' } }} />}
        label="Items Wanted"
        
      />
      <FormControlLabel
        control={<Switch checked={itemsForSale} onChange={handleItemsForSaleChange}  sx={{ '& .MuiSwitch-track': { bgcolor: '#003FA7' } }} />}
        label="Items for Sale"
      />
    </div>
  );
}


function LocationDropdown() {
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className={styles.filterCard}>
      <Select
        value={selectedLocation}
        onChange={handleLocationChange}
        fullWidth
        variant="outlined"
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Location
        </MenuItem>
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
      </Select>
    </div>
  );
}


function FilterSlider({ title, min, max, step, value, onChange }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography id="range-slider" gutterBottom>
        {title}
      </Typography>
      <Slider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        sx={{
          color: '#003FA7', // Set the color of the slider track
          '& .MuiSlider-thumb': {
            backgroundColor: '#003FA7', // Set the color of the slider thumb
          },
          '& .MuiSlider-valueLabel': {
            color: '#003FA7', // Set the color of the value label
          },
        }}
        
      />
    </div>
  );
}

function Filters() { 
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [locationRange, setLocationRange] = useState([0, 100]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };


  return (
    <>
      <div className={styles.filterCard} >
        <FilterSlider
          title="Price Range"
          min={0}
          max={2000}
          step={10}
          value={priceRange}
          onChange={handlePriceChange}
          style={{ backgroundColor: '#003FA7' }}
        />
      </div>
    </>
  );
}

function HomePage() {
  const [selectedTab, setSelectedTab] = useState("TextBookExchange");


  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className={`${styles.HomeContainer} container`}>
      <div className={`${styles.HomeRow} row`}>
        <div className={`${styles.homeColFirst} col-md-3`}>
        <img src={TmuLogo} alt="Logo" className={styles.tmuLogo} />
          <ItemSwitches />
          <Filters />
          <LocationDropdown />
        </div>
       
        

        <div className={`${styles.homeColSecond} col-md-9`}>
              <SearchAd />
              <Ads data={data} />
        </div>
      </div>
    </div>
  );
}

export default HomePage; 


