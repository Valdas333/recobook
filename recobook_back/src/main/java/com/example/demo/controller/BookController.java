package com.example.demo.controller;


import com.example.demo.dto.BookRequestDTO;
import com.example.demo.entity.Book;
import com.example.demo.repository.BookRepository;
import com.example.demo.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class BookController {

    private final BookRepository bookRepository;
    private final BookService bookService;

    public BookController(BookRepository bookRepository, BookService bookService) {
        this.bookRepository = bookRepository;
        this.bookService = bookService;
    }

    @PostMapping("/book/add")
    public String addBook(@RequestBody BookRequestDTO bookRequestDTO) {
        if (bookRepository.findByIsbn(bookRequestDTO.getIsbn()).isEmpty()) {
            bookService.saveBook(bookRequestDTO);
            return "Book added successfully";
        }
        return "Book with ISBN " + bookRequestDTO.getIsbn() + " already exists";
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
