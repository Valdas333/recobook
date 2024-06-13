package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/category/add")
    public String addCategory(@RequestBody Category category) {
        if (categoryRepository.findByName(category.getName()).isEmpty()){
            categoryRepository.save(category);
            return "Category added successfully";
        }
        return "Category already exists";
    }

    @DeleteMapping("category/delete/{id}")
    public String deleteCategory(@PathVariable Long id) {
        if (categoryRepository.findById(id).isPresent()){
            categoryRepository.deleteById(id);
            return "Category deleted successfully";
        }
        return "Category not found";
    }

    @PutMapping("category/update/{id}")
    public String updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            Category updatedCategory = existingCategory.get();
            updatedCategory.setName(category.getName());
            categoryRepository.save(updatedCategory);
            return "Category updated successfully";
        } else {
            return "Category not found";
        }
    }
}
