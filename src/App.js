import React from "react";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import Search from './components/Search'


const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));



function App(props) {
  const classes = useStyles();

   return (
      <div className="App">
        <div className={classes.root}>
          <Search/>
        </div>
      </div>
    ) ;
}

export default App
