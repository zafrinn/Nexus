import React from 'react';
import styles from './services.module.css';
import ExchangeTable from './Table';
import data from "./mockTextBooks.json";
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


function TextBookExchange() {
  return (
    <div className={styles.TxtExchangeContainer}>
      <div className={styles.searchBar}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search ISBN, Title"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </div>
      <div className={styles.TxtExchangeTable}>     
        <ExchangeTable data={data}/>
      </div>
    </div>
    

  );
}

export default TextBookExchange;
