import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    this.state = {
      ids: id,
      musicObj: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.musics();
  }

  musics = async () => {
    const { ids } = this.state;
    this.setState({
      loading: true,
    });
    const musicsGet = await getMusics(ids);
    this.setState({
      musicObj: musicsGet,
      loading: false,
    });
  }

  render() {
    const { musicObj, loading } = this.state;
    if (loading) {
      return (
        <>
          <Header />
          <p className="loadingFav">Carregando...</p>
        </>
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        <div className="flexAll">
          {musicObj
            .filter((el) => (el.kind !== 'song' && el))
            .map((el) => (
              <div key={ el.artworkUrl100 } className="flexCard">
                <div className="card">
                  <img src={ el.artworkUrl100 } alt={ el.collectionName } />
                  <p data-testid="artist-name">{el.artistName}</p>
                  <p data-testid="album-name">{el.collectionName}</p>

                </div>
              </div>
            ))}

          {musicObj
            .filter((el) => (el.kind === 'song' && el))
            .map((el) => (
              <MusicCard
                key={ el.trackName }
                musicObj={ musicObj }
                trackName={ el.trackName }
                trackId={ el.trackId }
                previewUrl={ el.previewUrl }
              />
            ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default Album;
