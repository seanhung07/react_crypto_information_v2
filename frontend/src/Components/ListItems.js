import * as React from 'react';
import MuiListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {  withStyles } from "@mui/styles";


const ListItem = withStyles({
    root: {
      "&$selected": {
        backgroundColor: "red",
        color: "white",
        "& .MuiListItemIcon-root": {
          color: "white"
        }
      },
      "&:hover": {
        backgroundColor: "#0E1017",
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        color: "white",
        // "& .MuiListItemIcon-root": {
        //   color: "white"
        // }
      }
    },
    selected: {}
  })(MuiListItem);

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon style={{fill: "white"}}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DataThresholdingIcon  style={{fill: "white"}} />
      </ListItemIcon>
      <ListItemText primary="Long/Short" />
    </ListItem>
    <ListItem button>
      <ListItemIcon >
        <AutoGraphIcon style={{fill: "white"}}/>
      </ListItemIcon>
      <ListItemText primary="Liquidation" />
    </ListItem>
    <ListItem button>
      <ListItemIcon >
        <BarChartIcon style={{fill: "white"}}/>
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon style={{fill: "white"}}/>
      </ListItemIcon>
      <ListItemText primary="News" />
    </ListItem>
  </div>
);
