package com.phonebook.backend.controllers;

import com.phonebook.backend.classes.Person;
import com.phonebook.backend.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping(value = "/persons")
    public List getAllPersons() {
        return personService.getAllPersons();
    }

    @GetMapping(value = "/persons/{id}")
    public Optional<Person> getPerson(@PathVariable Long id) {
        return personService.getPerson(id);
    }

    @PostMapping(value = "/persons")
    public Person addPerson(@RequestBody Person person) {
        return personService.addPerson(person);
    }

    @RequestMapping(value = "/persons/{id}", method = RequestMethod.PUT)
    public Person updatePerson(@RequestBody Person person, @PathVariable Long id) {
        return personService.updatePerson(id, person);
    }

    @RequestMapping(value = "/persons/{id}", method = RequestMethod.DELETE)
    public void deletePerson(@PathVariable Long id) {
        personService.deletePerson(id);
    }

}

