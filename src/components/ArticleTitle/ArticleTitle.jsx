import React, {Component} from 'react';
import PropTypes from "prop-types";

import styles from './ArticleTitle.module.scss';

class ArticleTitle extends Component {
  render() {

    return (
      <div className={styles.Title}>
        {this.props.children}
      </div>
    )
  }
}

ArticleTitle.PropTypes = {
  children:  PropTypes.node.isRequired
};

export default ArticleTitle;