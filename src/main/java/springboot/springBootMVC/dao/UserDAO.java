package springboot.springBootMVC.dao;

import springboot.springBootMVC.model.User;

import java.util.List;

public interface UserDAO {

    List<User> getAllUsers();

    void save(User user);

    void delete(User user);

    void edit(User user);

    User getById(long id);

    User getUser(String userName);
}
