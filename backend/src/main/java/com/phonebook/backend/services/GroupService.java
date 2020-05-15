package com.phonebook.backend.services;

import com.phonebook.backend.classes.Group;
import com.phonebook.backend.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

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

    // Removes one group based on given id
    public void deleteGroup(Long id) {
        groupRepository.deleteById(id);
    }
}
