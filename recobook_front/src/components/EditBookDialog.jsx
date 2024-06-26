import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import axiosInstance from "./utils/axiosInstance.jsx";

const EditBookDialog = ({book, open, onClose}) => {
    const [localBook, setLocalBook] = useState({ title: '', author: '' });
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setLocalBook(book);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle update logic here...
        console.log(localBook);
        onClose();
    };

    const handleChange = (event) => {
        if (event.target.name === 'category') {
            setLocalBook({
                ...localBook,
                category: categories.find(cat => cat.id === event.target.value),
            });
        } else {
            setLocalBook({
                ...localBook,
                [event.target.name]: event.target.value,
            });
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
                        value={localBook.description  || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="isbn"
                        label="ISBN"
                        type="text"
                        fullWidth
                        value={localBook.isbn  || ''}
                        onChange={handleChange}
                    />

                    <Select
                        name="category"
                        value={localBook.category.id  || ''}
                        onChange={handleChange}
                        label="Category"
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default EditBookDialog;