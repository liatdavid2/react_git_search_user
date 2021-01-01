import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsersFromGit } from '../redux/users/usersActions'
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ResultMenu from './ResultMenu'
import './Search.css'



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      flexGrow: 1,
    },
  },
  form: {
    background: 'white'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: '#2a4055',
    color: 'white',

  },
  searchField: {
    background: '#2a4055',
    color: 'white',
  },
  searchButton: {
    background: '#132231 !important',
    color: 'white',
  },
  headline:{
    textAlign:'center'
  },
  footer: {
    background: '#2a4055',
    color: 'white',
    position: "fixed",
    bottom: 0,
    height: '50px',
    width: '100%',
    padding:'5px'
  },
}));


export default function Search() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const users = useSelector(state => state.users)
  const [searchValue, setSearchValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const handlePageChange = (event, value) => {
    console.log(value)
    setPageNumber(value);
    setTimeout(dispatch(fetchUsersFromGit(searchValue, value)), 1000);
  };
  function handleChangeSelect(searchValue) {
    console.log(searchValue)
    if (searchValue !== "") {
      setSearchValue(searchValue)

    }

  }

  function handleClickGetUsers() {
    if (searchValue !== "") {
      dispatch(fetchUsersFromGit(searchValue, pageNumber))
    }
  }

  return users && users.data ? (
    <Grid container >
      <Grid item xs={12}>
        <Paper className={classes.paper}>

          <TextField id="standard-basic"
            className={classes.searchField}
            onChange={e => handleChangeSelect(e.target.value)} />
          <Button onClick={e => handleClickGetUsers(e.target.value)}
            className={classes.searchButton}  >Search</Button>

        </Paper>
      </Grid>
      <Grid item sm={4} xs={0}></Grid>
      <Grid item sm={4} xs={12}>
        {users.data.total_count ?
          <h2 className={classes.headline} >{users.data.total_count + ' users found'}</h2> : null}
        <ResultMenu users={users.data.items} />
      </Grid>
      <Grid item sm={4} xs={0}></Grid>
      <Grid item xs={12}>
        <footer className={classes.footer}>
          <Grid container >
            <Grid item xs={4}></Grid>
            {users.data.total_count ?
              (<Pagination count={100}
                page={pageNumber} onChange={handlePageChange} />) :
              null}
            <Grid item xs={4}></Grid>
          </Grid>
        </footer>
      </Grid>
    </Grid>

  ) : null;
}
