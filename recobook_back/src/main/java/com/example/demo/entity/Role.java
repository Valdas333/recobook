package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Table(name = "roles")
public enum Role {
    USER, ADMIN
}
