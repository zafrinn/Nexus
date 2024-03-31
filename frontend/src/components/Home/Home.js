import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './home.module.css'; 
import { IoIosArrowForward } from "react-icons/io";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: '1px solid', // Add a border
  boxShadow: '2px 2px 5px #A9A9A9',
  borderColor: theme.palette.primary.main, // Set border color to primary color
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  '&:focus-within': {
    outline: '2px solid', // Add an outline when focused
    outlineColor: theme.palette.primary.main, // Set outline color to primary color
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function SearchAd(){
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Use the searchValue variable here for further processing
    console.log('Search value:', searchValue);
  };

  return(
    <Search component="form" onSubmit={handleSearchSubmit}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchValue}
        onChange={handleSearchChange}
      />
    </Search>
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

  const handleLocationChange = (event, newValue) => {
    setLocationRange(newValue);
  };

  return (
    <>
      <div className={styles.filterCard}>
        <FilterSlider
          title="Price Range"
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={handlePriceChange}
        />
      </div>
      <div className={styles.filterCard}>
        <FilterSlider
          title="Location Range"
          min={0}
          max={200}
          step={5}
          value={locationRange}
          onChange={handleLocationChange}
        />
      </div>
    </>
  );
}

function HomePage() {
  const [selectedTab, setSelectedTab] = useState("TextBookExchange");
  const data = "null";

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };



  return (
    <div className={`${styles.HomeContainer} container`}>
      <div className={`${styles.HomeRow} row`}>
        <div className={`${styles.homeColFirst} col-md-3`}>
          <Filters />
        </div>
       


        <div className={`${styles.ServicesColSecond} col-md-9`}>
        <div className={styles.searchBar}>
         <SearchAd />
        </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 


