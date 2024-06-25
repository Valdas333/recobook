package com.example.demo.controller;


import com.example.demo.entity.Book;
import com.example.demo.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @PostMapping("/book/add")
    public String addBook(@RequestBody Book book) {
        if (bookRepository.findByIsbn(book.getIsbn()).isEmpty()) {
            bookRepository.save(book);
            return "Book added successfully";
        }
        return "Book with ISBN " + book.getIsbn() + " already exists";
    }

    @DeleteMapping("/book/delete/{id}")
    public String deleteBook(@PathVariable Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return "Book deleted successfully";
        }
        return "Book with id " + id + " does not exist";
    }

    @PutMapping("/book/edit/{id}")
    public String editBook(@PathVariable Long id, @RequestBody Book book) {
        Optional<Book> existingBookOptional = bookRepository.findById(id);
        if (existingBookOptional.isPresent()) {
            Book existingBook = existingBookOptional.get();
            if (book.getDescription() != null){
                existingBook.setDescription(book.getDescription());
            }
            if (book.getTitle() != null){
                existingBook.setTitle(book.getTitle());
            }
            if (book.getIsbn() != null){
                existingBook.setIsbn(book.getIsbn());
            }
            if(book.getPageCount() != null){
                existingBook.setPageCount(book.getPageCount());
            }
            if (book.getAuthor() != null){
                existingBook.setAuthor(book.getAuthor());
            }
            if(book.getCategory() != null ){
                existingBook.setCategory(book.getCategory());
            }

            bookRepository.save(existingBook);
            return "Book edited successfully";
        }
        return "Book with id " + id + " does not exist";
    }

    @GetMapping("/books")
    public Iterable<Book> getAllBooks() {
        return bookRepository.findAll();
    }

}
