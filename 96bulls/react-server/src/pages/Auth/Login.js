import React, { Component } from 'react';
import Form from '../components/common/Form';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import firebase from '../../config/firebase';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';


class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    usersRef: firebase.database().ref('users'),
    loading: false,
  };

  isFormValid = () => {
    const errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Please fill in all the field!' };
      this.setState({ errors: errors.concat(error), loading: false });
      return false;
    }
    return true;
  };

  isFormEmpty = ({
    email, password,
  }) => !email.length || !password.length;

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: [], loading: true }, () => {
      const { email, password, errors } = this.state;
      if (this.isFormValid(this.state)) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((signedInUser) => {
            console.log(signedInUser);
          })
          .catch((err) => {
            console.error(err);
            if (err.code === 'auth/wrong-password') {
              const error = { message: 'Invalid Password' };
              this.setState({
                errors: errors.concat(error), loading: false,
              });
            }
            if (err.code === 'auth/user-not-found') {
              const error = { message: 'User not found' };
              this.setState({
                errors: errors.concat(error), loading: false,
              });
            }
            if (err.code === 'auth/invalid-email') {
              const error = { message: 'Please check your email' };
              this.setState({
                errors: errors.concat(error), loading: false,
              });
            }
          });
      }
    });
  };

  render() {
    const {
      email, password, errors, loading,
    } = this.state;

    return (
      <section>
        <Form className={styles['login-form']}>
          <h1>ALTIS ACADEMIA</h1>
          <Input
            id="email"
            value={email}
            name="email"
            placeholder="E-mail"
            type="email"
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
          {errors.length > 0 && (
            <ErrorMessage>
              {this.displayErrors(errors)}
            </ErrorMessage>
          )}
          <p className={styles['login-info']}>
            {'Is this your first time? '}
            <Link to="/register">Sign Up</Link>
          </p>
          <div className={styles['button-wrapper']}>
            <Button
              disabled={loading}
              loader={loading}
              onClick={this.handleSubmit}
            >
            Log In
            </Button>
          </div>
        </Form>
      </section>
    );
  }
}

export default Login;
