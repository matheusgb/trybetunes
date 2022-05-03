import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    this.setState({
      loading: true,
    });

    const api = await getUser();

    this.setState({
      loading: false,
      result: api.name,
    });
  }

  render() {
    const { result, loading } = this.state;

    if (loading === true) {
      return (
        <header data-testid="header-component">
          <Link to="/search">
            <button type="button" data-testid="link-to-search"> Pesquisa </button>
          </Link>

          <Link to="/favorites">
            <button type="button" data-testid="link-to-favorites"> Favoritos </button>
          </Link>

          <Link to="/profile">
            <button type="button" data-testid="link-to-profile"> Perfil </button>
          </Link>
          <p>Carregando...</p>
        </header>
      );
    }

    return (
      <header data-testid="header-component">
        <Link to="/search">
          <button type="button" data-testid="link-to-search"> Pesquisa </button>
        </Link>

        <Link to="/favorites">
          <button type="button" data-testid="link-to-favorites"> Favoritos </button>
        </Link>

        <Link to="/profile">
          <button type="button" data-testid="link-to-profile"> Perfil </button>
        </Link>

        <p data-testid="header-user-name">{result}</p>
      </header>
    );
  }
}

export default Header;