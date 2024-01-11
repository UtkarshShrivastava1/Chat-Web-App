// src/main/java/com/example/backendSpringBoot/controller/ChatController.java

package com.example.backendSpringBoot.controller;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backendSpringBoot.entity.Chat;
import com.example.backendSpringBoot.entity.User;


@RestController
@RequestMapping("/api/chat")
public class ChatController {

   // Dummy data for testing
    private final List<Chat> dummyData = new ArrayList<>();

    // Constructor
    public ChatController() {
        dummyData.add(new Chat("617a077e18c25468bc7c4dd4", false, List.of(
                new User("John Doe", "john@example.com"),
                new User("janedoe", "janedoe@example.com")
        ), "John Doe"));

        dummyData.add(new Chat("617a077e18c25468bc7c4dd5", false, List.of(
                new User("Alice Smith", "alice@example.com"),
                new User("bobsburgers", "bobs@example.com")
        ), "Alice and Bob"));

        dummyData.add(new Chat("617a077e18c25468bc7c4dd6", true, List.of(
                new User("Eve Johnson", "eve@example.com"),
                new User("mallory", "mallory@example.com"),
                new User("charlie", "charlie@example.com")
        ), "Group Chat"));

        // Add 7 more chat objects with your dummy data
    }

    @GetMapping
    public ResponseEntity<List<Chat>> getAllChats() {
        return new ResponseEntity<>(dummyData, HttpStatus.OK);
    }

     @GetMapping("/{id}")
    public ResponseEntity<Chat> getChatById(@PathVariable String id) {
        return dummyData.stream()
                .filter(chat -> chat.getId().equals(id))
                .findFirst()
                .map(chat -> new ResponseEntity<>(chat, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
