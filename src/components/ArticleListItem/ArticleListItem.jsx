import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './ArticleListItem.module.scss';

class ArticleListItem extends Component {
  render() {
    let date = this.props.datePublished;
    let dateFromNow = moment(date).fromNow(); 
    let formattedDate = moment(date).format('MMMM Do, h:mm a')

    return(
      <div className={styles.Container}>
        <h4 className={styles.TopicTag}>{this.props.topic}</h4>
        <h2 className={styles.Title}>
          <a onClick={this.props.handleClick} href={this.props.permalink}>
            {this.props.headline}
          </a>
        </h2>
        <div className={styles.Time} title={formattedDate}>{dateFromNow}</div>
        
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