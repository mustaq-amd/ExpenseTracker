package in.mustaq.expensetrackerapi.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.mustaq.expensetrackerapi.entity.User;
import in.mustaq.expensetrackerapi.entity.UserModel;
import in.mustaq.expensetrackerapi.exceptions.ItemAlreadyExistException;
import in.mustaq.expensetrackerapi.exceptions.ResourceNotFoundException;
import in.mustaq.expensetrackerapi.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Autowired
	private UserRepository userRepository;

	@Override
	public User createUser(UserModel user) {

		if (userRepository.existsByEmail(user.getEmail())) {
			throw new ItemAlreadyExistException("User already exist with the email " + user.getEmail());
		}

		User newUser = new User();
		BeanUtils.copyProperties(user, newUser);
		newUser.setPassword(bcryptEncoder.encode(newUser.getPassword()));
		return userRepository.save(newUser);

	}

	@Override
	public User readUser() throws ResourceNotFoundException {

		Long userId = getLoggedInUser().getId();
		return userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with the id : " + userId));
	}

	@Override
	public User updateUser(UserModel user) {

		User existingUser = readUser();
		existingUser.setName(user.getName() != null ? user.getName() : existingUser.getName());
		existingUser.setEmail(user.getEmail() != null ? user.getEmail() : existingUser.getEmail());
		existingUser.setPassword(
				user.getPassword() != null ? bcryptEncoder.encode(user.getPassword()) : existingUser.getPassword());
		existingUser.setAge(user.getAge() != null ? user.getAge() : existingUser.getAge());

		return userRepository.save(existingUser);

	}

	@Override
	public void deleteUser() {
		User user = readUser();
		userRepository.delete(user);

	}

	@Override
	public User getLoggedInUser() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		System.out.println(authentication);
		System.out.println(authentication.getPrincipal());
		System.out.println(authentication.getName());

		String email = authentication.getName();

		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("user not exist for the email : " + email));

	}

}
