import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      disable: true,
      loading: false,
      api: [],
      click: false,
      prevInput: '',
    };
  }

  handleChanger = (e) => {
    this.setState({ input: e.target.value }, () => this.disableButton());
  }

  disableButton = () => {
    const { input } = this.state;
    const minLength = 2;

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

  pesquisa = async () => {
    const { input } = this.state;
    this.setState({
      loading: true,
    });
    const albums = await searchAlbumsAPI(input);
    this.setState({
      prevInput: input,
      input: '',
      loading: false,
      api: albums,
      click: true,
      disable: true,
    });
  }

  render() {
    const { disable, input, loading, click, api, prevInput } = this.state;

    if (loading === true) {
      return (
        <>
          <Header />
          <p className="loading">Carregando...</p>
        </>
      );
    }
    return (
      <div data-testid="page-search">
        <Header />
        <div className="search">
          <label htmlFor="artista">
            <FontAwesomeIcon className="icon" icon={ faMagnifyingGlass } />
            <input
              type="text"
              placeholder="Nome do artista"
              id="artista"
              data-testid="search-artist-input"
              value={ input }
              onChange={ this.handleChanger }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disable }
            onClick={ this.pesquisa }
          >
            Pesquisar
          </button>
        </div>

        <div className="result">
          {click === true && (
            <p>
              Resultado de álbuns de:
              {' '}
              {prevInput}
            </p>)}
        </div>

        <div className="musics">
          {api
            .map((el) => (
              <div key={ el.collectionId } className="card">
                <Link
                  style={ { textDecoration: 'none',
                    color: 'inherit' } }
                  to={ `/album/${el.collectionId}` }
                  data-testid={ `link-to-album-${el.collectionId}` }
                >
                  <div>
                    <img src={ el.artworkUrl100 } alt={ el.collectionName } />
                    <p className="info">{el.collectionName}</p>
                    <p className="info">{el.artistName}</p>
                  </div>
                </Link>
              </div>
            ))}

          {click === true && api.length === 0 && <p> Nenhum álbum foi encontrado </p>}
        </div>
      </div>
    );
  }
}

export default Search;
