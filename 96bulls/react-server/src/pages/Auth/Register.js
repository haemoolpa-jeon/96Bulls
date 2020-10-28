import React, { Component } from 'react';
import md5 from 'md5';
import Form from '../components/common/Form';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import firebase from '../../config/firebase';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';


class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users'),
  };

  isFormValid = () => {
    const errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Please fill in all the field!' };
      this.setState({ errors: errors.concat(error), loading: false });
      return false;
    } if (!this.isPasswordValid(this.state)) {
      error = { message: 'Invaild Password' };
      this.setState({ errors: errors.concat(error), loading: false });
      return false;
    }
    return true;
  };

  isFormEmpty = ({
    username, email, password, passwordConfirmation,
  }) => !username.length || !email.length || !password.length || !passwordConfirmation.length;

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    }
    if (password !== passwordConfirmation) {
      return false;
    }
    return true;
  };

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: [], loading: true }, () => {
      const {
        email, password, username, errors,
      } = this.state;
      if (this.isFormValid()) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((createdUser) => {
            console.log(createdUser);
            createdUser.user
              .updateProfile({
                displayName: username,
                photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
              })
              .then(() => {
                this.saveUser(createdUser).then(() => {
                  console.log('user saved');
                });
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            if (err.code === 'auth/email-already-in-use') {
              const error = { message: 'This email is already being used' };
              this.setState({ errors: errors.concat(error), loading: false });
            }
            if (err.code === 'auth/invalid-email') {
              const error = { message: 'Please check the email address' };
              this.setState({
                errors: errors.concat(error), loading: false,
              });
            }
            console.error(err);
          });
      }
    });
  };

  saveUser = (createdUser) => {
    const { usersRef } = this.state;
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      email: createdUser.user.email,
      id: createdUser.user.uid,
    });
  };

  render() {
    const {
      username, email, password, passwordConfirmation, errors, loading,
    } = this.state;

    return (
      <section>
        <Form className={styles['register-form']}>
          <h1>ALTIS ACADEMIA</h1>
          <Input
            id="email"
            value={email}
            name="email"
            placeholder="Email"
            type="email"
            onChange={this.handleChange}
          />
          <Input
            id="username"
            value={username}
            name="username"
            placeholder="Nickname"
            type="text"
            onChange={this.handleChange}
          />
          <Input
            id="password"
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
          />
          <Input
            id="passwordConfirmation"
            value={passwordConfirmation}
            name="passwordConfirmation"
            placeholder="Confirm Password"
            type="password"
            onChange={this.handleChange}
          />
          {errors.length > 0 && (
            <ErrorMessage>
              {this.displayErrors(errors)}
            </ErrorMessage>
          )}
          <p className={styles['register-info']}>
            {'Have you signed up already? '}
            <Link to="/signin">Log In</Link>
          </p>
          <div className={styles['button-wrapper']}>
            <Button
              disabled={loading}
              loader={loading}
              onClick={this.handleSubmit}
            >
            Register
            </Button>
          </div>
        </Form>
      </section>
    );
  }
}

export default Register;
