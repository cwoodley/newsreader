import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './ArticleListItem.module.scss';

class ArticleListItem extends Component {
  render() {
    return(
      <div className={styles.Container}>
        <h2 className={styles.Title}>
          <a href={this.props.permalink}>
            {this.props.headline}
          </a>
        </h2>
        <div className={styles.Teaser}>
          {this.props.teaser}
        </div>
      </div>
    )
  }
}

ArticleListItem.PropTypes = {
  permalink: PropTypes.string.isRequired, 
  headline: PropTypes.string.isRequired, 
  teaser:  PropTypes.string, 
};

export default ArticleListItem;