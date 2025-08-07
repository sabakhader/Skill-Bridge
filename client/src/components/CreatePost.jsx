import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Close as CloseIcon, Image as ImageIcon } from '@mui/icons-material';

const CreatePost = ({ open, onClose, onSubmit }) => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(postData);
    handleClose();
  };

  const handleClose = () => {
    setPostData({
      title: '',
      content: '',
      category: '',
      image: null
    });
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create New Post</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Post Title"
            type="text"
            fullWidth
            required
            value={postData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={postData.category}
              label="Category"
              onChange={handleChange}
              required
            >
              <MenuItem value="question">Question</MenuItem>
              <MenuItem value="discussion">Discussion</MenuItem>
              <MenuItem value="showcase">Project Showcase</MenuItem>
              <MenuItem value="resource">Resource</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="content"
            label="Content"
            multiline
            rows={6}
            fullWidth
            required
            value={postData.content}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<ImageIcon />}
              >
                Add Image
              </Button>
            </label>
          </Box>

          {imagePreview && (
            <Box sx={{ mb: 2 }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain'
                }}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Post
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreatePost; 