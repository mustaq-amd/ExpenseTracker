package in.mustaq.expensetrackerapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import in.mustaq.expensetrackerapi.entity.User;
import in.mustaq.expensetrackerapi.entity.UserModel;
import in.mustaq.expensetrackerapi.service.UserService;

@CrossOrigin("*")
@RestController
public class UserController {

	@Autowired
	private UserService userService;

	/*
	 * @GetMapping("/users/{id}") public ResponseEntity<User> readUser(@PathVariable
	 * Long id) {
	 * 
	 * return new ResponseEntity<User>(userService.readUser(id), HttpStatus.OK);
	 * 
	 * }
	 * 
	 * @PutMapping("/users/{id}") public ResponseEntity<User>
	 * updateUser(@RequestBody UserModel user, @PathVariable Long id){ return new
	 * ResponseEntity<User>(userService.updateUser(user, id),HttpStatus.OK); }
	 * 
	 * @DeleteMapping("/users/{id}") public ResponseEntity<HttpStatus>
	 * deleteUser(@PathVariable Long id){
	 * 
	 * userService.deleteUser(id); return new
	 * ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
	 * 
	 * }
	 */

	@GetMapping("/profile")
	public ResponseEntity<User> readUser() {

		return new ResponseEntity<User>(userService.readUser(), HttpStatus.OK);

	}

	@PutMapping("/profile")
	public ResponseEntity<User> updateUser(@RequestBody UserModel user) {
		return new ResponseEntity<User>(userService.updateUser(user), HttpStatus.OK);
	}

	@DeleteMapping("/deactivate")
	public ResponseEntity<HttpStatus> deleteUser() {

		userService.deleteUser();
		return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);

	}

}
