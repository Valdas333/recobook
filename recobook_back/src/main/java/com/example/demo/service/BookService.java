package com.example.demo.service;

import com.example.demo.dto.BookRequestDTO;
import com.example.demo.entity.Book;
import com.example.demo.entity.Category;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

    public BookService(BookRepository bookRepository, CategoryRepository categoryRepository) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
    }

    public void saveBook(BookRequestDTO bookRequestDTO) {
        Optional<Category> category = categoryRepository.findById(bookRequestDTO.getCategory());
        if (category.isPresent()) {
            Book book = Book.builder()
                    .title(bookRequestDTO.getTitle())
                    .author(bookRequestDTO.getAuthor())
                    .description(bookRequestDTO.getDescription())
                    .isbn(bookRequestDTO.getIsbn())
                    .pageCount(bookRequestDTO.getPageCount())
                    .category(category.get())
                    .build();
            bookRepository.save(book);
        }
        else {
            throw new IllegalArgumentException("Category not found");
        }
    }
}
