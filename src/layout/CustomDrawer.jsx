
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BookOnline, Person } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function CustomDrawer(props) {

  const history = useHistory()
  return (
    <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography p={1} mb={0} variant="h4" gutterBottom component="p">
        Library
      </Typography>
      <Divider />
      <List>

        <ListItem onClick={(e) => history.push('/students')} button key={'students'}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={'Students'} />
        </ListItem>

        <ListItem onClick={(e) => history.push('/books')} button key={'books'}>
          <ListItemIcon>
            <BookOnline />
          </ListItemIcon>
          <ListItemText primary={'Books'} />
        </ListItem>

      </List>

    </Drawer>
  )
}
