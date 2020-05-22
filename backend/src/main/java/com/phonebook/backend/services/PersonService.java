package com.phonebook.backend.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.phonebook.backend.classes.Group;
import com.phonebook.backend.classes.Person;
import com.phonebook.backend.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    // Retrieve all persons
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    // Retrieves one person based on given id
    public Optional<Person> getPerson(Long id) {
        return personRepository.findById(id);
    }

    // Add a person
    public Person addPerson(Person person) {
        return personRepository.save(person);
    }

    // Update person
    public Person updatePerson(Long id, Person updatedPerson) {
        Person person = personRepository.getOne(id);
        person.setNumber(updatedPerson.getNumber());
        return personRepository.save(person);
    }

    // Removes one person based on given id
    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }

}
