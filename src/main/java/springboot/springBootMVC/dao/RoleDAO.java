package springboot.springBootMVC.dao;

import springboot.springBootMVC.model.Role;
import springboot.springBootMVC.model.User;

import java.util.List;

public interface RoleDAO {
    List<User> getAllRoles();

    void add(Role role);

    void edit(Role role);

    Role getById(long id);

    Role getByName(String name);

}
