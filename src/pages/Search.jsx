import React from 'react';
import { Link } from 'react-router-dom';
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
    });
  }

  render() {
    const { disable, input, loading, click, api, prevInput } = this.state;

    if (loading === true) {
      return (
        <>
          <Header />
          <p>Carregando...</p>
        </>
      );
    }
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="artista">
          Nome do artista:
          <input
            type="text"
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
        {click === true && (
          <p>
            Resultado de álbuns de:
            {' '}
            {prevInput}
          </p>)}

        {api
          .map((el) => (
            <Link
              key={ el.collectionId }
              to={ `/album/${el.collectionId}` }
              data-testid={ `link-to-album-${el.collectionId}` }
            >
              <div>
                <img src={ el.artworkUrl100 } alt={ el.collectionName } />
                <p>{el.collectionName}</p>
                <p>{el.artistName}</p>
              </div>
            </Link>
          ))}

        {click === true && api.length === 0 && <p> Nenhum álbum foi encontrado </p>}
      </div>
    );
  }
}

export default Search;