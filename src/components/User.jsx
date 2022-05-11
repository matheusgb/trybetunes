import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';

class User extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({
      loading: true,
    });

    const api = await getUser();

    this.setState({
      loading: false,
      user: api,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div>
        {loading ? <p className="loadingFav">Carregando...</p>
          : (
            <div className="centerUser">
              <div className="userPage">
                <img data-testid="profile-image" src={ user.image } alt="profile" />
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.description}</p>
                <button
                  type="button"
                  onClick={ (this.handleClick) }
                >
                  Editar perfil
                </button>
              </div>
            </div>
          )}
      </div>
    );
  }
}

User.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default User;
