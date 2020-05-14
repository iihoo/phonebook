package com.phonebook.backend.classes;

import com.phonebook.backend.classes.Group;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "persons")
@Getter
@Setter
@NoArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String number;
    @ManyToMany
    private List<Group> groups = new ArrayList<>();

    public Person(String name, String number) {
        this.name = name;
        this.number = number;
    }

}

