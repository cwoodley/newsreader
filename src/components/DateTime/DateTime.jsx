import React, {Component} from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

import styles from './DateTime.module.scss';

class DateTime extends Component {
  render() {
    const dateFromNow = moment(this.props.date).fromNow(); 
    const formattedDate = moment(this.props.date).format('MMMM Do, h:mm a');

    return (
      <div className={styles.Time} title={formattedDate}>
        {dateFromNow}
      </div>
    )
  }
}

DateTime.PropTypes = {
  date: PropTypes.string.isRequired
}

export default DateTime;