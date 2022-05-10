import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.favs();
  }

  componentDidUpdate() {
    const refavs = async () => {
      const favoritesSongs = await getFavoriteSongs();

      this.setState({
        favorites: favoritesSongs,
        loading: false,
      });
    };
    refavs();
  }

  favs = async () => {
    this.setState({
      loading: true,
    });

    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      favorites: favoritesSongs,
    });
  }

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <p className="loading">Carregando...</p>
          : (
            favorites
              .map((el) => (
                <MusicCard
                  key={ el.trackName }
                  musicObj={ favorites }
                  trackName={ el.trackName }
                  trackId={ el.trackId }
                  previewUrl={ el.previewUrl }
                />
              )))}
      </div>
    );
  }
}

export default Favorites;
