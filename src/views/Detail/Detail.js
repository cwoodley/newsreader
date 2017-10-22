import React, { Component } from 'react';

import api from '../../utils/api';

import ArticleTitle from '../../components/ArticleTitle/ArticleTitle';
import DateTime from '../../components/DateTime/DateTime';

import styles from './Detail.modules.scss';

class Detail extends Component {
  constructor() {
    super();

    this.state = {
      content: [],
      date: '',
      title: '',
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
    });
  }

  getArticleData(article) {
    api.getArticleById(article)
    .then((res) => {
      this.setArticleData(res);
      // console.log(res);
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

    const articleContent = content.map((item, index) => {
      return (
        <p key={index} style={{marginBottom: 10}}>{item.text}</p>
      )
    });

    const image = this.state.media ? 
      <div className="media">
        <img src={this.state.media} width="100%" alt="" /> 
      </div>
    : null;

    return (
      <div className={styles.PageContainer}>
        {image}
        
        <h1 className={styles.Title}>
          <ArticleTitle>
            {this.state.title}
          </ArticleTitle>
        </h1>
        <h2>
          <DateTime date={this.props.date} />
        </h2>
        <div style={{fontSize: 12}}>
          {articleContent}
        </div>
      </div>
    )
  }
}

export default Detail;