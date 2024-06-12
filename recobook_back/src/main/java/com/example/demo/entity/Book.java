package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@RequiredArgsConstructor
public class Book {

    @Id @GeneratedValue
    private Long id;
    private String title;
    private String Description;
    private String ISBN;
    private Integer pageCount;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
