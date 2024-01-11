// src/main/java/com/example/backendSpringBoot/repository/ChatRepository.java
package com.example.backendSpringBoot.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.backendSpringBoot.entity.Chat;

public interface ChatRepository extends MongoRepository<Chat, String> {
}
