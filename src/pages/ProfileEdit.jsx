import React from 'react';
import { func } from 'prop-types';
import Header from '../components/Header';
import UserEdit from '../components/UserEdit';

class ProfileEdit extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <UserEdit history={ history } />
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: func,
}.isRequired;

export default ProfileEdit;
