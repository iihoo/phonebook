package com.phonebook.backend.services;

import com.phonebook.backend.classes.Group;
import com.phonebook.backend.classes.Person;
import com.phonebook.backend.repositories.GroupRepository;
import com.phonebook.backend.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private PersonRepository personRepository;

    // retrieve all groups
    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    // Add a group
    public Group addGroup(Group group) {
        return groupRepository.save(group);
    }

    // Retrieves one group based on given id
    public Optional<Group> getGroup(Long id) {
        return groupRepository.findById(id);
    }

    // Update group: add a person
    public Person addPersonToGroup(Long id, Person p) {
        Group group = groupRepository.getOne(id);
        Person person = personRepository.getOne(p.getId());
        person.addGroup(group);
        return personRepository.save(person);
    }

    // Update group: remove a person
    public Person removePersonFromGroup(Long id, Person p) {
        Group group = groupRepository.getOne(id);
        Person person = personRepository.getOne(p.getId());
        person.removeGroup(group);
        return personRepository.save(person);
    }

    // Removes one group based on given id
    public void deleteGroup(Long id) {
        Group group = groupRepository.getOne(id);

        if (group.getPersons().size() == 0) {
            groupRepository.deleteById(id);
        } else {
            List<Long> idList =
                    group.getPersons().stream()
                            .map(Person::getId)
                            .collect(Collectors.toList());
            // remove group from each persons group list
            for (Long personId : idList) {
                Person person = personRepository.getOne(personId);
                person.removeGroup(group);
                personRepository.save(person);
            }
            // and then remove the group
            groupRepository.deleteById(id);
        }
    }
}
