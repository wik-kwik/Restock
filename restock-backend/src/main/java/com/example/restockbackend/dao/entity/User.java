package com.example.restockbackend.dao.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String username;
    private String password;
    private LocalDateTime create_date;
    private LocalDateTime remove_date;

    public User() {
    }

    public User(Long id, String username, String password, LocalDateTime create_date, LocalDateTime remove_date) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.create_date = create_date;
        this.remove_date = remove_date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreate_date() {
        return create_date;
    }

    public void setCreate_date(LocalDateTime create_date) {
        this.create_date = create_date;
    }

    public LocalDateTime getRemove_date() {
        return remove_date;
    }

    public void setRemove_date(LocalDateTime remove_date) {
        this.remove_date = remove_date;
    }
}
