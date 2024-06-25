import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    Container,
    Typography,
    Grid,
} from '@mui/material';
import axiosInstance from '../utils/axiosInstance';

const BookFormPage = () => {
    const [book, setBook] = useState({
        author: '',
        title: '',
        description: '',
        isbn: '',
        pageCount: '',
        category: '',
    });

    const [categories, setCategories] = useState([]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/book/add', book);
            console.log('Book submitted:', response.data);
            // Reset form
            setBook({
                author: '',
                title: '',
                description: '',
                isbn: '',
                pageCount: '',
                category: '',
            });
        } catch (error) {
            console.log(book);
            console.error('There was an error submitting the book!', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Book
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="author"
                                label="Author"
                                fullWidth
                                variant="outlined"
                                value={book.author}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                label="Title"
                                fullWidth
                                variant="outlined"
                                value={book.title}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                label="Description"
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={4}
                                value={book.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="isbn"
                                label="ISBN"
                                fullWidth
                                variant="outlined"
                                value={book.isbn}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="pageCount"
                                label="Page Count"
                                fullWidth
                                variant="outlined"
                                type="number"
                                value={book.pageCount}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={book.category}
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
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default BookFormPage;

