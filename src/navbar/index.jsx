import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import DateRangeIcon from '@mui/icons-material/DateRange';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const drawerWidth = 240;

const Navbar = ({body})=>{
  const navigate = useNavigate();
  
  //top items in the menu
  const topItems = [['Professors','/professors',<AssignmentIndIcon/>], ['Modules', '/modules',<ClassIcon/>], ['Rooms','/rooms',<MeetingRoomIcon/>], ['Periods','/periods',<AccessTimeFilledIcon/>],['Groups','/groups',<GroupsIcon/>]];
  //bottom items in the menu
  const botItems = [['Schedule','/schedule',<DateRangeIcon/>],['Settings','/settings',<SettingsIcon/>]];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar title='h' position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="inherit" enableColorOnDark>
        <Toolbar>
            <img src='images/logo.png' alt='ISGA logo' width='10%'/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {topItems.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={()=>navigate(text[1])}>
                  <ListItemIcon>
                    {text[2]}
                  </ListItemIcon>
                  <ListItemText primary={text[0]} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {botItems.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={()=>navigate(text[1])}>
                  <ListItemIcon>
                    {text[2]}
                  </ListItemIcon>
                  <ListItemText primary={text[0]} />
                </ListItemButton>
              </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>
      <div style={{ backgroundColor:"#e6e6e6", width:'100%', height:'100%' }}>
        {body}
      </div>
    </Box>
  );
}
export default Navbar;