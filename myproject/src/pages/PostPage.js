import { Title } from "@mui/icons-material";
import { Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useParams } from "react-router-dom";
const style = {
  position: 'absolute'  ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const  PostPage=()=> {
    const params = useParams();
    const [data, setData] = useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    console.log(data);
const upload=()=>{
    fetch(
        `https://myproject-af124-default-rtdb.firebaseio.com/posts/${params.id}.json?api_key=AIzaSyAXa_-rm9d_fGu3FCuxltHJLNQrSjAEXfM&language=ru-RU`,
      )   .then((res) => res.json())
        .then((data) => {setData(data); setTitle(data.title); setDescription(data.description)});
     
}
    useEffect(() => {
        upload()
    }, [])
    
    const handleSave = () => {
     
        console.log('Title:', title);
        console.log('Description:', description);
        const data = {
            title: title, 
            description: description,
         
          };
      
      
          fetch(`https://myproject-af124-default-rtdb.firebaseio.com/posts/${params.id}.json?api_key=AIzaSyAXa_-rm9d_fGu3FCuxltHJLNQrSjAEXfM&language=ru-RU`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then(response => {
              if (response.ok) {
                
                console.log('Data saved successfully.');
                handleClose(); // Close the modal after saving
              } else {
                // Handle an error response here
                console.error('Failed to save data.');
              }
            })
            .catch(error => {
              // Handle a network error here
              console.error('Network error:', error);
            });
       
            upload()
        };
        
      
    
  return (
    <Container>
        
  <h3>
    {data?.title}
  </h3>
  <p>{data?.description}</p>
  <Button  onClick={handleOpen}>
    edit
  </Button>
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default PostPage;
