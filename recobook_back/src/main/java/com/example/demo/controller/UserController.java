package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userService.save(user);
        return "User registered successfully";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello user, from Spring Boot! ";
    }

    @GetMapping("/hello-admin")
    public String helloAdmin() {
        return "Hello Admin, from Spring Boot! ";
    }
}
