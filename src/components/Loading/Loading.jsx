import React, {Component} from 'react';
import Spinner from 'react-spinkit';

import styles from './Loading.module.scss';

class Loading extends Component {
  render() {
    return (
      <div className={styles.Loading}>
        <Spinner name="circle" />
      </div>
    )
  }
}

export default Loading;