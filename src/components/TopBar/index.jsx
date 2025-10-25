import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const path = location.pathname;
  
  // Get context for the right side of TopBar
  const getRightText = () => {
    if (path.startsWith("/users/")) {
      const userId = path.split("/")[2];
      const user = models.userModel(userId);
      if (user) {
        return `${user.first_name} ${user.last_name}`;
      }
      return "";
    } else if (path.startsWith("/photos/")) {
      const userId = path.split("/")[2];
      const user = models.userModel(userId);
      if (user) {
        return `Photos of ${user.first_name} ${user.last_name}`;
      }
      return "";
    }
    return "";
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Tuan_B22AT270
        </Typography>
        <Typography variant="h5" color="inherit">
          {getRightText()}
        </Typography>
      </Toolbar>
    </AppBar>
    );
}

export default TopBar;
