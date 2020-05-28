package com.phonebook.backend.controllers;

import com.phonebook.backend.classes.Group;
import com.phonebook.backend.classes.Person;
import com.phonebook.backend.services.GroupService;
import com.phonebook.backend.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired
    private PersonService personService;

    // return all persons
    @GetMapping
    public List<Person> getAllPersons() {
        return personService.getAllPersons();
    }

    // return one person based on the person id
    @GetMapping(value = "/{id}")
    public Optional<Person> getPerson(@PathVariable Long id) {
        return personService.getPerson(id);
    }

    // create a new person
    @PostMapping
    public Person addPerson(@RequestBody Person person) {
        return personService.addPerson(person);
    }

    // update number of the person
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Person updatePerson(@RequestBody Person person, @PathVariable Long id) {
        return personService.updatePerson(id, person);
    }

    // delete the person based on person id, returns list of all groups
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public List<Group> deletePerson(@PathVariable Long id) {
        return personService.deletePerson(id);
    }

}