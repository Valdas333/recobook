import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';
import axiosInstance from "./utils/axiosInstance.jsx";

const EditBookDialog = ({ book, open, onClose }) => {
    const [localBook, setLocalBook] = useState({ title: '', author: '', description: '', isbn: '', category: { id: '', name: '' } });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (book) {
            setLocalBook({
                ...book,
                category: book.category || { id: '', name: '' }
            });
        }
    }, [book]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedBook = {
                ...localBook,
                category: localBook.category.id
            };
            await axiosInstance.put(`/book/edit/${localBook.id}`, updatedBook);
            console.log('Book updated successfully');
            onClose();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'category') {
            setLocalBook((prevState) => ({
                ...prevState,
                category: categories.find(cat => cat.id === value) || { id: '', name: '' },
            }));
        } else {
            setLocalBook((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Book</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={localBook.title || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="author"
                        label="Author"
                        type="text"
                        fullWidth
                        value={localBook.author || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={localBook.description || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="isbn"
                        label="ISBN"
                        type="text"
                        fullWidth
                        value={localBook.isbn || ''}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            name="category"
                            value={localBook.category.id || ''}
                            onChange={handleChange}
                            label="Category"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditBookDialog;
