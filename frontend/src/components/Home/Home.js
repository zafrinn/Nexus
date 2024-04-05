import React, { Fragment, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./home.module.css";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Ads from "./Ads.js";
import { FormControlLabel, Switch, Select, MenuItem } from "@mui/material";
import TmuLogo from "../../assets/HomePage/TMU_LOGO.png";
import { getAdvertisementsByCategoryId } from "../../apiHelpers";
import { useNavigate } from "react-router-dom";

const SearchBox = styled("div")(({ theme }) => ({
  border: "1px solid #003fa7",
  padding: "5px",
  borderRadius: "5px",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "none",
  display: "flex",
  alignItems: "center",
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

/**
 * SearchAd component for displaying the search bar.
 * @param {function} handleSearchChange - Function to handle search input change.
 * @param {string} searchValue - Value of the search input.
 */
function SearchAd({ handleSearchChange, searchValue }) {
  return (
    <div className={styles.searchBar}>
      <SearchBox>
        <form style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Search>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Search>
        </form>
      </SearchBox>
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

/**
 * Filter component for displaying filter options.
 * @param {boolean} itemsWanted - Whether to display items wanted filter option.
 * @param {boolean} itemsForSale - Whether to display items for sale filter option.
 * @param {array} priceRange - Range of prices selected by the user.
 * @param {string} selectedLocation - Selected location filter option.
 * @param {function} onItemsWantedChange - Function to handle items wanted filter change.
 * @param {function} onItemsForSaleChange - Function to handle items for sale filter change.
 * @param {function} onPriceChange - Function to handle price range filter change.
 * @param {function} onLocationChange - Function to handle location filter change.
 */
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

/**
 * HomePage component for displaying the home page content.
 */
function HomePage() {
  const navigate = useNavigate();
  const [itemsWanted, setItemsWanted] = useState(true);
  const [itemsForSale, setItemsForSale] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

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

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category1Ads = await getAdvertisementsByCategoryId(1);
        const category2Ads = await getAdvertisementsByCategoryId(2);
        const allAds = [...category1Ads, ...category2Ads];
        const uniqueAds = allAds.filter(
          (ad, index, self) =>
            index ===
            self.findIndex((a) => a.advertisementId === ad.advertisementId)
        );
        setAdvertisements(uniqueAds);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchData();
  }, []);

  const filteredAds = advertisements.filter((ad) => {
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
            searchValue={searchValue}
          />
          <Ads advertisements={filteredAds} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
