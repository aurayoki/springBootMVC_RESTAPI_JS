package springboot.springBootMVC.service;


import springboot.springBootMVC.model.Role;
import springboot.springBootMVC.model.User;

import java.util.List;

public interface RoleService {

    List<User> getAllRoles();

    void add(Role role);

    void edit(Role role);

    Role getById(long id);

    Role getByName(String name);
}
