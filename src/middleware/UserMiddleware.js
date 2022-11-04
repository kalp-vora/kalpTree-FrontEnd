import UserServices from "../service/UserServices";

const UserMiddleware = {
  register: (user, onSuccess = () => {}, onError = () => {}) => {
    // SETTING NAME
    let firstName = user.firstName.trim();
    firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

    let lastName = user.lastName.trim();
    lastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    const name = firstName + " " + lastName;

    // SETTING CONTACT
    const contact = "91" + user.contact;

    // SETTING EMAIL
    const email = user.email.trim();

    const newUser = {
      name: name,
      email: email,
      password: user.password,
      contactNumber: contact,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      role: user.role,
    };

    UserServices.register(newUser)
      .then((data) => {
        console.log(data);
        onSuccess(data);
      })
      .catch((error) => {
        console.log(error);
        onError(error);
      });
  },
};

export default UserMiddleware;
