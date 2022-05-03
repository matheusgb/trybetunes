import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
  }

  componentDidMount() {
    this.songs();
  }

  songs = async () => {
    const { trackId } = this.props;

    this.setState({
      loading: true,
    });
    const favoritos = await getFavoriteSongs();
    const checked = favoritos.some((el) => el.trackId === trackId);
    this.setState({ check: checked });
    this.setState({
      loading: false,
    });
  };

  handleChanger = async (e) => {
    const { musicObj } = this.props;
    const checkedObj = musicObj.filter((el) => (el.previewUrl === e.target.name));

    this.setState({
      loading: true,
    });

    if (e.target.checked === true) {
      await addSong(...checkedObj);
      this.setState({
        loading: false,
        check: true,
      });
    } else {
      await removeSong(...checkedObj);
      this.setState({
        loading: false,
        check: false,
      });
    }
  }

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { loading, check } = this.state;

    return (
      <div>
        {loading && <p>Carregando...</p>}
        <div key={ trackName } className="tudo">
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackId }>
            Favorita

            <input
              type="checkbox"
              className={ trackId }
              id={ trackId }
              name={ previewUrl }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleChanger }
              checked={ check }
            />
          </label>
        </div>

      </div>
    );
  }
}

MusicCard.propTypes = {
  musicObj: PropTypes.object,
  ids: PropTypes.string,
}.isRequired;

export default MusicCard;
