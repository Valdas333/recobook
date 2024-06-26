import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    CardMedia,
    CardActions,
    Button,
    Container,
} from '@mui/material';
import axiosInstance from './utils/axiosInstance.jsx';
import { useEffect, useState } from 'react';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axiosInstance.get('/books');
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setLoading(false);
            }
        };

        fetchBooks();
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
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid key={book.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 100 }}
                                image="/static/images/cards/contemplative-reptile.jpg"
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
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BookList;

