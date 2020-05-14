package com.phonebook.backend.repositories;

import com.phonebook.backend.classes.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
}
