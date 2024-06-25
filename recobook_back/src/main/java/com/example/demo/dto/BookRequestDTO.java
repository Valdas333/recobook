package com.example.demo.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookRequestDTO {
    private Long id;
    private String author;
    private String title;
    private String description;
    private String isbn;
    private Integer pageCount;
    private Long category;
}
