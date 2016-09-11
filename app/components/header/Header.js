import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

class Header extends React.Component {
  render() {
    return (
      <div styleName="castle-background">
        <ul styleName="header">
          <li><a href="">Flea Market</a></li>
          <li><a href=""><span>Logout</span><i className="fa fa-sign-out" /></a></li>
        </ul>
      </div>
    );
  }
}

export default CSSModules(Header, styles);