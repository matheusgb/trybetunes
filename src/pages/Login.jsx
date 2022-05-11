import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      disable: true,
      input: '',
      loading: false,
      waiting: '',
    };
  }

  handleChanger = (e) => {
    this.setState({ input: e.target.value }, () => this.disableButton());
  }

  disableButton = () => {
    const { input } = this.state;
    const minLength = 3;

    if (input.length < minLength) {
      this.setState({
        disable: true,
      });
    } else {
      this.setState({
        disable: false,
      });
    }
  }

  createName = async () => {
    const { input } = this.state;
    this.setState({
      loading: true,
    });

    const userCreate = await createUser({
      name: input,
      email: 'usuario@usuario.com.br',
      image: 'https://img.icons8.com/ios-glyphs/452/user--v1.png',
      description: 'Insira uma descrição',
    });

    this.setState({
      loading: false,
      waiting: userCreate,
    });
  }

  render() {
    const { disable, input, loading, waiting } = this.state;

    if (loading === true) {
      return <p className="loadingFav">Carregando...</p>;
    } if (waiting === 'OK' && loading === false) {
      return <Redirect to="/search" />;
    }
    return (
      <div className="page">
        <img src="https://i.ibb.co/yp12R9x/logo.png" alt="logo" />
        <div data-testid="page-login" className="login">
          <form className="form">
            <label htmlFor="name-input">
              <input
                placeholder="Nome"
                type="text"
                id="name-input"
                data-testid="login-name-input"
                value={ input }
                onChange={ this.handleChanger }
                maxLength="15"
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ disable }
              onClick={ this.createName }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
