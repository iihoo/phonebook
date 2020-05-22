package com.phonebook.backend.controllers;

import com.phonebook.backend.classes.Group;
import com.phonebook.backend.classes.Person;
import com.phonebook.backend.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    // return all groups
    @GetMapping
    public List getAllGroups() {
        return groupService.getAllGroups();
    }

    // return one group based on the group id
    @GetMapping(value = "/{id}")
    public Optional<Group> getGroup(@PathVariable Long id) {
        return groupService.getGroup(id);
    }

    // add a person to the group
    @RequestMapping(value = "/addpersons/{id}", method = RequestMethod.PUT)
    public Person addToGroup(@RequestBody Person person, @PathVariable Long id) {
        return groupService.addPersonToGroup(id, person);
    }

    // remove a person from the group
    @RequestMapping(value = "/removepersons/{id}", method = RequestMethod.PUT)
    public Person removeFromGroup(@RequestBody Person person, @PathVariable Long id) {
        return groupService.removePersonFromGroup(id, person);
    }

    // create a new group
    @PostMapping
    public Group addGroup(@RequestBody Group group) {
        return groupService.addGroup(group);
    }

    // delete the group based on group id
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
    }

}
