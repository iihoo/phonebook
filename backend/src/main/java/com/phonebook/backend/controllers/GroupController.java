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

    @GetMapping
    public List getAllGroups() {
        return groupService.getAllGroups();
    }

    @GetMapping(value = "/{id}")
    public Optional<Group> getGroup(@PathVariable Long id) {
        return groupService.getGroup(id);
    }

    @RequestMapping(value = "/addpersons/{id}", method = RequestMethod.PUT)
    public Person addToGroup(@RequestBody Person person, @PathVariable Long id) {
        return groupService.addPersonToGroup(id, person);
    }

    @RequestMapping(value = "/removepersons/{id}", method = RequestMethod.PUT)
    public Person removeFromGroup(@RequestBody Person person, @PathVariable Long id) {
        return groupService.removePersonFromGroup(id, person);
    }

    @PostMapping
    public Group addGroup(@RequestBody Group group) {
        return groupService.addGroup(group);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
    }

}
