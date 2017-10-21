import React, { Component } from 'react';

// utils
import api from '../../utils/api';

//components
import ArticleListItem from '../../components/ArticleListItem/ArticleListItem';

//styles
import styles from './App.module.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      networkError: false,
      isLoading: true
    }
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
      this.setArticles(res);
      console.log(res);
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
    const loadingMessage = this.state.isLoading ? 'Loading!' : null;
    const articles = this.state.articles;

    const articleList = articles.map(function(item, index) {
      return (
        <li key={"item_"+item.id}>
          <ArticleListItem 
            permalink={item._self}
            headline={item.homepageHead} 
            teaser={item.homepageTeaser}
          />
        </li>
      )
    });

    return (
      <div className={styles.PageWrapper}>
        <ul>
          {articleList}
        </ul>
      </div>
    );
  }
}

export default App;
