/**
 * Define UserDetail, a React component of Project 4.
 */
import React from "react";
import {Typography, Card, CardContent, Button, Box} from "@mui/material";
import {useParams, Link} from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return (
      <Typography variant="h6">User not found: {userId}</Typography>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5">{user.first_name} {user.last_name}</Typography>
          <Button component={Link} to={`/photos/${user._id}`} variant="contained" color="primary">
            Photos
          </Button>
        </Box>

        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Location:</strong> {user.location}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Occupation:</strong> {user.occupation}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }} dangerouslySetInnerHTML={{ __html: user.description }} />
      </CardContent>
    </Card>
  );
}

export default UserDetail;
