import React, { Component } from 'react';

import SuggestionList from '../SuggestionList/SuggestionList';
import Description from '../Description/Description';
import './Page.scss';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log({ prop: this.props });

    return (
      <div className="Page">
        <Description {...this.props} />
        <SuggestionList newItem={this.item} />
      </div>
    );
  }
}

export default Page;
