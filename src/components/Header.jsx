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
      result: api,
    });
  }

  render() {
    const { result, loading } = this.state;

    if (loading === true) {
      return (
        <header data-testid="header-component">

          <div className="title">
            <img src="https://i.ibb.co/5hsmHKp/Group-1-1.png" alt="logo" />
            <p className="loading">Carregando...</p>
          </div>

          <div className="menu">
            <div className="botao">
              <Link to="/search">
                <button type="button" data-testid="link-to-search"> Pesquisa </button>
              </Link>
            </div>

            <div className="botao">
              <Link to="/favorites">
                <button type="button" data-testid="link-to-favorites"> Favoritos </button>
              </Link>
            </div>

            <div className="botao">
              <Link to="/profile">
                <button type="button" data-testid="link-to-profile"> Perfil </button>
              </Link>
            </div>
          </div>
        </header>
      );
    }

    return (
      <header data-testid="header-component">
        <div className="title">
          <img src="https://i.ibb.co/5hsmHKp/Group-1-1.png" alt="logo" />

          <div className="user">
            <p data-testid="header-user-name">{result.name}</p>
            <div>
              <img src={ result.image } alt="foto de perfil" />
            </div>
          </div>
        </div>

        <div className="menu">
          <div className="botao">
            <Link to="/search">
              <button type="button" data-testid="link-to-search"> Pesquisa </button>
            </Link>
          </div>

          <div className="botao">
            <Link to="/favorites">
              <button type="button" data-testid="link-to-favorites"> Favoritos </button>
            </Link>
          </div>

          <div className="botao">
            <Link to="/profile">
              <button type="button" data-testid="link-to-profile"> Perfil </button>
            </Link>
          </div>
        </div>

      </header>
    );
  }
}

export default Header;
