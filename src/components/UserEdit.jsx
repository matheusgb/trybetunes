import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';

class UserEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      disabled: true,
    };
  }

  componentDidMount() {
    this.getUser();

    const { email } = this.state;
    const regex = /^\S+@\S+\.\S+$/;
    this.setState({
      disabled: regex.test(email),
    });
  }

  getUser = async () => {
    this.setState({
      loading: true,
    });

    const api = await getUser();

    this.setState({
      loading: false,
      name: api.name,
      description: api.description,
      email: api.email,
      image: api.image,
    });
  }

  handleInput = (event) => {
    if (event.target.name === 'email') {
      const regex = /^\S+@\S+\.\S+$/;
      this.setState({
        disabled: !regex.test(event.target.value),
      });
    }

    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick = async () => {
    const { name, description, email, image } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    });

    await updateUser({
      name,
      email,
      image,
      description,
    });

    history.push('/profile');
  }

  render() {
    const { loading, name, description, email, image, disabled } = this.state;
    return (
      <div>
        {loading ? <p className="loadingFav">Carregando...</p>
          : (
            <div className="centerUser">
              <div className="userPage">
                <img data-testid="profile-image" src={ image } alt="profile" />
                <input
                  type="text"
                  data-testid="edit-input-name"
                  value={ name }
                  name="name"
                  onInput={ this.handleInput }
                  maxLength="20"
                />
                <input
                  type="text"
                  data-testid="edit-input-email"
                  value={ email }
                  name="email"
                  maxLength="50"
                  onInput={ this.handleInput }
                />
                <input
                  type="text"
                  data-testid="edit-input-description"
                  value={ description }
                  name="description"
                  onInput={ this.handleInput }
                  maxLength="200"
                />
                <input
                  type="text"
                  data-testid="edit-input-image"
                  value={ image }
                  name="image"
                  onInput={ this.handleInput }
                />
                <button
                  type="button"
                  onClick={ this.handleClick }
                  disabled={ disabled }
                  data-testid="edit-button-save"
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
      </div>
    );
  }
}

UserEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default UserEdit;
