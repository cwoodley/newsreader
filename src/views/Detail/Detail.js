import React, { Component } from 'react';

import api from '../../utils/api';

import ArticleTitle from '../../components/ArticleTitle/ArticleTitle';
import DateTime from '../../components/DateTime/DateTime';
import Loading from '../../components/Loading/Loading';

import styles from './Detail.module.scss';

class Detail extends Component {
  constructor() {
    super();

    this.state = {
      content: [],
      date: '',
      title: '',
      isLoading: true,
      media: '',
    }
  }

  findContent(data, content) {
    let result = data.find((item) => {
      return item.kind === content
    });

    return result;
  }

  setArticleData(data) {
    let items = data.items;
    
    // Data from server has content text in different parts 
    // of the items array, let's find them!
    let content = this.findContent(items, 'content');
    
    // Let's find the title
    let title = this.findContent(items, 'heading');

    this.setState({
      content: content.blocks,
      date: data.publicationDate,
      media: data.assets[0].original.reference,
      title: title.text,
      isLoading: false,
    });
  }

  getArticleData(article) {
    api.getArticleById(article)
    .then((res) => {
      this.setArticleData(res);
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
    this.getArticleData(this.props.match.params.id);
  }

  render() {
    let content = this.state.content;
    let date = this.state.date;

    const displayDate = this.state.date ? <h2><DateTime date={this.state.date} /></h2> : null;
    
    const articleContent = content.map((item, index) => {
      return (
        <p key={index} style={{marginBottom: 10}}>{item.text}</p>
      )
    });

    const loadingStatus = this.state.isLoading ? 
      <Loading />
    : null;

    const image = this.state.media ? 
      <div className="media">
        <img src={this.state.media} width="100%" alt="" /> 
      </div>
    : null;

    return (
      <div className={styles.PageContainer}>
        {loadingStatus}
        
        {image}
        
        <h1 className={styles.Title}>
          <ArticleTitle>
            {this.state.title}
          </ArticleTitle>
        </h1>
        {displayDate}
        <div className={styles.Content}>
          {articleContent}
        </div>
      </div>
    )
  }
}

export default Detail;