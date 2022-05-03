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

    const userCreate = await createUser({ name: input });

    this.setState({
      loading: false,
      waiting: userCreate,
    });
  }

  render() {
    const { disable, input, loading, waiting } = this.state;

    if (loading === true) {
      return <p>Carregando...</p>;
    } if (waiting === 'OK' && loading === false) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name-input">
            Identificação:
            <input
              type="text"
              id="name-input"
              data-testid="login-name-input"
              value={ input }
              onChange={ this.handleChanger }
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
    );
  }
}

export default Login;
