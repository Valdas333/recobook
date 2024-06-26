import { Box, CircularProgress, Container, Grid, Card, CardMedia, CardContent,
    Typography, CardActions, Button } from '@mui/material';
import axiosInstance from './utils/axiosInstance.jsx';
import {useEffect, useState} from 'react';
import EditBookDialog from "./EditBookDialog.jsx";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);

    const onEdit = (book) => {
        setSelectedBook(book);
    };

    const handleEditDialogClose = () => {
        setSelectedBook(null);
    };


    useEffect(() => {
        let isMounted = true;
        const fetchBooks = async () => {
            try {
                const response = await axiosInstance.get('/books');
                if (isMounted) {
                    setBooks(response.data);
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching books:', error);
                    setLoading(false);
                }
            }
        };

        fetchBooks();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Container>
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid item xs={8} sm={8} md={12} lg={12} key={book.id}>
                        <Card sx={{maxWidth: 345}}>
                            <CardMedia
                                sx={{height: 140}}
                                image="/static/images/cards/contemplative-reptile.jpg" // Replace with actual image URL if available
                                title={book.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {book.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {book.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Author: {book.author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ISBN: {book.isbn}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Pages: {book.pageCount}
                                </Typography>
                            </CardContent>
                            {selectedBook &&
                                <EditBookDialog
                                    open={Boolean(selectedBook)}
                                    onClose={handleEditDialogClose}
                                    book={selectedBook}
                                />
                            }
                            <CardActions>
                                <Button size="small" onClick={()=> onEdit(book)}>Edit</Button>
                                <Button size="small">Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BookList;
