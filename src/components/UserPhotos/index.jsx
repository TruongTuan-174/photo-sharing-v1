import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

// Import images directly
const getImageUrl = (fileName) => {
  try {
    return require(`../../images/${fileName}`);
  } catch (e) {
    console.warn(`Could not load image: ${fileName}`, e);
    return '';
  }
};

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);

  const formatDate = (s) => {
    if (!s) return "";
    // model dates look like "2012-08-30 10:44:23" -> replace space with T to parse
    const iso = s.replace(" ", "T");
    const d = new Date(iso);
    if (isNaN(d.getTime())) return s;
    return d.toLocaleString();
  };

  if (!photos || photos.length === 0) {
    return <Typography variant="h6">No photos for this user.</Typography>;
  }

  return (
    <div>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 2 }}>
          {photo.file_name && (
            <CardMedia
              component="img"
              height="400"
              image={getImageUrl(photo.file_name)}
              alt={photo.file_name}
            />
          )}
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle1">{formatDate(photo.date_time)}</Typography>
            </Box>

            <Typography variant="subtitle2">Comments</Typography>
            <List>
              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((c) => (
                  <React.Fragment key={c._id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <>
                            <Link to={`/users/${c.user._id}`}>{c.user.first_name} {c.user.last_name}</Link>
                            {" — "}
                            <Typography component="span" variant="caption">{formatDate(c.date_time)}</Typography>
                          </>
                        }
                        secondary={
                          <Typography component="span" variant="body2">{c.comment}</Typography>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary={"No comments"} />
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
