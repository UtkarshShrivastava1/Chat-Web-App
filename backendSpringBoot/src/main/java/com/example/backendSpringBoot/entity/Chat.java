package com.example.backendSpringBoot.entity;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Chat {

    @Id
    private String id;
    private boolean isGroupChat;
    private List<User> users;
    private String chatName;

    // Default constructor
    public Chat() {
        // Default constructor
    }

    // Parameterized constructor
    public Chat(String id, boolean isGroupChat, List<User> users, String chatName) {
        this.id = id;
        this.isGroupChat = isGroupChat;
        this.users = users;
        this.chatName = chatName;
    }

    // Getter and Setter for id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Getter and Setter for isGroupChat
    public boolean isGroupChat() {
        return isGroupChat;
    }

    public void setGroupChat(boolean groupChat) {
        isGroupChat = groupChat;
    }

    // Getter and Setter for users
    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    // Getter and Setter for chatName
    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }
}
