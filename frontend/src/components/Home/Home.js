import React, { Fragment, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import styles from "./home.module.css";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import data from "./HomeMockData.json";
import Ads from "./Ads.js";
import { FormControlLabel, Switch, Select, MenuItem } from "@mui/material";
import TmuLogo from "../../assets/TMU_LOGO.png";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.primary.main}`,
  boxShadow: "2px 2px 5px #A9A9A9",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function SearchAd({ handleSearchChange, searchValue }) {
  return (
    <div className={styles.searchBar}>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "transparent",
          width: "70%",
          marginLeft: "150px",
        }}
      >
        <Search component="form" style={{ flex: "1", margin: "0px" }}>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchValue}
            onChange={handleSearchChange}
            style={{ padding: "5px" }}
          />
        </Search>
      </form>
    </div>
  );
}

const StyledFilterCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
  width: "80%",
  marginLeft: "70px",
  marginTop: "20px",
  padding: "20px",
  borderRadius: "20px",
  boxShadow: "0px 5px 7px rgba(4, 4, 4, 0.2)",
  backgroundColor: "#FAFAFA",
});

function Filter({
  itemsWanted,
  itemsForSale,
  priceRange,
  selectedLocation,
  onItemsWantedChange,
  onItemsForSaleChange,
  onPriceChange,
  onLocationChange,
}) {
  return (
    <Fragment>
      <StyledFilterCard>
        <FormControlLabel
          control={
            <Switch checked={itemsWanted} onChange={onItemsWantedChange} />
          }
          label="Items Wanted"
        />
        <FormControlLabel
          control={
            <Switch checked={itemsForSale} onChange={onItemsForSaleChange} />
          }
          label="Items for Sale"
        />
      </StyledFilterCard>
      <StyledFilterCard>
        <Typography id="price-range-slider" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={onPriceChange}
          min={0}
          max={2000}
          step={10}
          valueLabelDisplay="auto"
          aria-labelledby="price-range-slider"
        />
      </StyledFilterCard>
      <StyledFilterCard>
        <Select
          value={selectedLocation}
          onChange={onLocationChange}
          fullWidth
          variant="outlined"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select Location
          </MenuItem>
          <MenuItem value="">All Locations</MenuItem>
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
      </StyledFilterCard>
    </Fragment>
  );
}

function HomePage() {
  const [itemsWanted, setItemsWanted] = useState(true);
  const [itemsForSale, setItemsForSale] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [searchValue, setSearchValue] = useState(""); // Define searchValue state

  const handleItemsWantedChange = (event) => {
    setItemsWanted(event.target.checked);
  };

  const handleItemsForSaleChange = (event) => {
    setItemsForSale(event.target.checked);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  // Add handleSearchChange and handleSearchSubmit functions
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const filteredAds = data.filter((ad) => {
      const meetsItemsWantedCondition =
        !itemsWanted || (itemsWanted && ad.category.categoryId === 1);
      const meetsItemsForSaleCondition =
        !itemsForSale || (itemsForSale && ad.category.categoryId === 2);
      const meetsPriceRangeCondition =
        ad.price >= priceRange[0] && ad.price <= priceRange[1];
      const meetsLocationCondition =
        !selectedLocation || ad.location === selectedLocation;
      const meetsSearchCondition =
        !searchValue ||
        ad.title.toLowerCase().includes(searchValue.toLowerCase());

      return (
        ((itemsWanted && meetsItemsWantedCondition) ||
          (itemsForSale && meetsItemsForSaleCondition)) &&
        meetsPriceRangeCondition &&
        meetsLocationCondition &&
        meetsSearchCondition
      );
    });

    setFilteredData(filteredAds);
  }, [itemsWanted, itemsForSale, priceRange, selectedLocation, searchValue]);

  return (
    <div className={`${styles.HomeContainer} container`}>
      <div className={`${styles.HomeRow} row`}>
        <div className={`${styles.homeColFirst} col-md-3`}>
          <img src={TmuLogo} alt="Logo" className={styles.tmuLogo} />
          <Filter
            itemsWanted={itemsWanted}
            itemsForSale={itemsForSale}
            priceRange={priceRange}
            selectedLocation={selectedLocation}
            onItemsWantedChange={handleItemsWantedChange}
            onItemsForSaleChange={handleItemsForSaleChange}
            onPriceChange={handlePriceChange}
            onLocationChange={handleLocationChange}
          />
        </div>
        <div className={`${styles.homeColSecond} col-md-9`}>
          <SearchAd
            handleSearchChange={handleSearchChange}
            searchValue={searchValue} // Pass searchValue state to SearchAd
          />
          <Ads data={filteredData} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
