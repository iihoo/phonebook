package com.phonebook.backend.controllers;

import com.phonebook.backend.classes.Group;
import com.phonebook.backend.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping(value = "/groups")
    public List getAllGroups() {
        return groupService.getAllGroups();
    }

    @GetMapping(value = "/groups/{id}")
    public Optional<Group> getGorup(@PathVariable Long id) {
        return groupService.getGroup(id);
    }

    @PostMapping(value = "/groups")
    public Group addGroup(@RequestBody Group group) {
        return groupService.addGroup(group);
    }

    @RequestMapping(value = "/groups/{id}", method = RequestMethod.DELETE)
    public void deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
    }

}
