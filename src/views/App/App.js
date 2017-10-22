import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import PropTypes from "prop-types";

// views
import Articles from '../Articles/Articles';
import Detail from '../Detail/Detail';

class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(context) {
    super(context);
  }

  render() {
    return (
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <div>
          <Route path="/" exact component={Articles}/>
          <Route path="/article/:id" component={Detail} />
        </div>
      </Router>
    );
  }
}

export default App;
