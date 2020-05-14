package com.phonebook.backend.repositories;

import com.phonebook.backend.classes.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
