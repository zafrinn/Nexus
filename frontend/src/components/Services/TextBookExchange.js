import React, { useState } from 'react';
import styles from './services.module.css';
import ExchangeTable from './Table';
import data from "./mockTextBooks.json";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function TextBookExchange() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={styles.TxtExchangeContainer}>
      <div className={styles.searchBar}>
        <form style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Search>
            <StyledInputBase
              placeholder="Search ISBN, Title..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Search>
        </form>
      </div>
      <div className={styles.TxtExchangeTable}>
        <ExchangeTable searchValue={searchValue} data={data} />
      </div>
    </div>
  );
}

export default TextBookExchange;
