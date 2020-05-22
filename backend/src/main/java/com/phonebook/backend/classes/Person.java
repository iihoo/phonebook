package com.phonebook.backend.classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "persons")
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String number;
    @JsonIgnoreProperties(value = "persons")
    @ManyToMany
    private List<Group> groups = new ArrayList<>();

    public Person(String name, String number) {
        this.name = name;
        this.number = number;
    }

    public void addGroup(Group group) {
        if (!this.groups.contains(group)) {
            this.groups.add(group);
        }
    }

    public void removeGroup(Group group) {
        this.groups.remove(group);
    }

}

