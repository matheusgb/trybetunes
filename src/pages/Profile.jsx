import React from 'react';
import { func } from 'prop-types';
import Header from '../components/Header';
import User from '../components/User';

class Profile extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="page-profile">
        <Header />
        <User history={ history } />
      </div>
    );
  }
}

Profile.propTypes = {
  history: func,
}.isRequired;

export default Profile;
