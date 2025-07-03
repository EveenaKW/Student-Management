import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");

  useEffect(() => {
    axios.get("http://localhost:7000/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("Error fetching announcements:", err));
  }, []);

  const handlePost = () => {
    if (!newAnnouncement.trim()) return;
    axios.post("http://localhost:7000/announcements", {
      message: newAnnouncement,
    })
      .then((res) => {
        setAnnouncements([res.data, ...announcements]);
        setNewAnnouncement("");
      })
      .catch((err) => console.error("Error posting announcement:", err));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>📢 Announcements</Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Enter new announcement"
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handlePost}>
            Post
          </Button>
        </Box>

        <List>
          {announcements.map((item) => (
            <ListItem key={item._id} divider>
              <ListItemText
                primary={item.message}
                secondary={new Date(item.date).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Announcements;
