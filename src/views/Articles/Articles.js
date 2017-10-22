import React, { Component } from 'react';

// utils
import api from '../../utils/api';

//components
import ArticleListItem from '../../components/ArticleListItem/ArticleListItem';
import Loading from '../../components/Loading/Loading';

//styles
import styles from './Articles.module.scss';

class Articles extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      networkError: false,
      isLoading: true
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log(e.target.getAttribute('href'));
  }

  setArticles(data){
    this.setState({
      articles: data,
      isLoading: false
    });
  }

  getNewsArticles() {
    api.getArticles()
    .then((res) => {
      this.setArticles(res.documents);
    }).catch((error) => {
        this.setState({
          error: 'Network request failed',
          networkError: true,
          isLoading: false,
        });
        console.log(error);
      }
    );
  }

  componentWillMount() {
    this.getNewsArticles();
  }

  render() {
    const loadingStatus = this.state.isLoading ? 
      <Loading />
    : null;

    const articles = this.state.articles;

    const articleList = articles.map((item) => {
      return (
        <li key={"item_"+item.id}  className={styles.ArticleItem}>
          <ArticleListItem 
            articleId={item.id}
            datePublished={item.publicationDate}
            headline={item.homepageHead} 
            mainImage={item.mainImage.reference}
            permalink={item._self}
            teaser={item.homepageTeaser}
            topic={item.primaryTopic}
          />
        </li>
      )
    });

    return (
      <div>
        <div className={styles.PageWrapper}>
          <div className={styles.ContentWrapper}>
            {loadingStatus}
            <ul className={styles.ArticleList}>
              {articleList}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Articles;
