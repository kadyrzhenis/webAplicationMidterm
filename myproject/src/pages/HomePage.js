import { useCallback, useEffect, useState } from "react";
import { Button, Container, FormControl, Grid } from "@mui/material";
import { PostItem } from "../components/PostItem";
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";

export function HomePage() {
  const [postContent, setPostContent] = useState("");
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => setIsModalOpen(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log(data?.length);
  const handleSave = () => {
    console.log("Title:", title);
    console.log("Description:", description);
    const data = {
      title: title,
      description: description,
      author: "zhenis",
      likes: 0,
      dislike: 0,
    };
    axios
    .get(
      "https://houses-f0eff-default-rtdb.europe-west1.firebasedatabase.app/scandiHouse/calls.json?api_key=YOUR_API_KEY",
    )
    .then((res) => {
      axios.put(
        `https://myproject-af124-default-rtdb.firebaseio.com/posts/${res.data?.length}.json?api_key=AIzaSyAXa_-rm9d_fGu3FCuxltHJLNQrSjAEXfM&language=ru-RU`   ,
        data
      )})


    // fetch(
    //   `https://myproject-af124-default-rtdb.firebaseio.com/posts/${+data?.length}.json?api_key=AIzaSyAXa_-rm9d_fGu3FCuxltHJLNQrSjAEXfM&language=ru-RU`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   }
    // )
    //   .then((response) => {
    //     if (response.ok) {
    //     } else {
    //       // Handle an error response here
    //       console.error("Failed to save data.");
    //     }
    //   })
    //   .catch((error) => {
    //     // Handle a network error here
    //     console.error("Network error:", error);
    //   });

    onClose();
  };

  const load = () => {
    fetch(
      `https://myproject-af124-default-rtdb.firebaseio.com/posts.json?api_key=AIzaSyAXa_-rm9d_fGu3FCuxltHJLNQrSjAEXfM&language=ru-RU`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <Container maxWidth="xl">

      <h1>Posts</h1>
      <button onClick={() => setIsModalOpen(true)}>Create New Post</button>

      <Grid container spacing={2}>
        {data?.map((el, index) => (
          <Grid item xs={12} sm={6} md={3}>
            <PostItem key={el.id} post={el} index={index} />
          </Grid>
        ))}
      </Grid>
      {/* </div> */}
      <Modal
        open={isModalOpen}
        onClose={onClose}
        aria-labelledby="create-post-modal-title"
        aria-describedby="create-post-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label="New Post Content"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="New Post Content"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Save Post
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}
