import React, { Component } from 'react';

import api from '../../utils/api';

class Detail extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      content: []
    }
  }

  setArticleData(data) {
    this.setState({
      title: data.items[2].text,
      content: data.items[1].blocks,
      media: data.assets[0].original.reference
    });

    // console.log(data.items[2].text);
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
      <div>
        {image}

        <h1 style={{marginBottom: 10}}>{this.state.title}</h1>
        <div style={{fontSize: 12}}>
          {articleContent}
        </div>
      </div>
    )
  }
}

export default Detail;