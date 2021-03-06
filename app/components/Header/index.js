import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import { SignOutButton } from 'redux-auth/default-theme';
import {
  IndexLink,
  Link,
} from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Header';
  }
  componentWillMount() {
    const { getUser, isSignedIn } = this.props;
    if (isSignedIn) {
      getUser();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.isSignedIn === false && nextProps.isSignedIn === true) {
      nextProps.getUser();
    }
  }
  render() {
    const { isSignedIn, changeLocationOnSignOut, user, userFakeName } = this.props;
    const LoginLogoutCmp = isSignedIn ? (
      <SignOutButton
        styleName="sign-out"
        next={
          () => {
            return changeLocationOnSignOut('/');
          }
        }
      >
        <span>Logout</span><i className="fa fa-sign-out" />
      </SignOutButton>
    ) : (
      <Link to="/login" styleName="sign-in">
        <span>Login</span><i className="fa fa-sign-in" />
      </Link>
    );
    return (
      <div styleName="castle-background">
        <div styleName="user-setting">
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p styleName="fake-name">{userFakeName}</p>
        </div>
        <div styleName="circle-logo"></div>
        <div styleName="circle-base"></div>
        <ul styleName="header scroll-header">
          <li><IndexLink to="/">Flea Market</IndexLink></li>
          <li>{LoginLogoutCmp}</li>
        </ul>
      </div>
    );
  }
}

Header.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  changeLocationOnSignOut: PropTypes.func.isRequired,
  userFakeName: PropTypes.string,
  user: PropTypes.object,
  getUser: PropTypes.func.isRequired,
};

export default CSSModules(Header, styles, { allowMultiple: true });