import React, { Component } from 'react';

import SuggestionList from '../SuggestionList/SuggestionList';
import Description from '../Description/Description';
import classes from './Page.scss';

  class Page extends Component {
    render() {
      return (
        <div className={classes.Page}>
          <Description
            {...this.props}
          />
          <SuggestionList newItem={this.item} />
        </div>
      )
    }
  }

export default Page