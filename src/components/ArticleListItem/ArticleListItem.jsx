import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HashRouter as Router, Link, Route} from 'react-router-dom';

import ArticleTitle from '../ArticleTitle/ArticleTitle';
import TopicTag from '../TopicTag/TopicTag';
import DateTime from '../DateTime/DateTime';

import styles from './ArticleListItem.module.scss';

class ArticleListItem extends Component {
  render() {
    let date = this.props.datePublished;

    return(
      <div className={styles.Container}>
        <div className={styles.MediaContainer}>
          <img src={this.props.mainImage} className={styles.MediaItem} alt="" />
        </div>
        <div className={styles.ContentContainer}>
          <h4>
            <TopicTag topic={this.props.topic} />
          </h4>
          <h2>
            <ArticleTitle>
              <Link 
                to={'/article/' + this.props.articleId}
              >
                {this.props.headline}
              </Link>
            </ArticleTitle>
          </h2>
          <h3 className={styles.Time}>
            <DateTime date={date} />
          </h3>
          
          <div className={styles.Teaser}>
            {this.props.teaser}
          </div>
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