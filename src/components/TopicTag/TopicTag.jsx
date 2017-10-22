import React, {Component} from 'react';

import styles from './TopicTag.module.scss';

class Masthead extends Component {
  render() {
    return (
      <div>
        <h4 className={styles.TopicTag}>{this.props.topic}</h4>
      </div>
    )
  }
}

export default Masthead;