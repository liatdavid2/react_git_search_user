import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  divider:{
    borderBottom:'1px solid',
    width: '100%',
   margin:0
  }
}));


export default function ResultMenu(props) {
  const classes = useStyles();


  return props.users ?(
    <List className={classes.root}>
    {props.users && props.users.map((item, key)=> 
    <ListItem className={classes.divider} key={key} >
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={item.avatar_url} />
      </ListItemAvatar>
      <ListItemText primary={item.login} secondary={item.bio} />

    </ListItem>
    )
    }
  
  </List>

  ):null;
}
