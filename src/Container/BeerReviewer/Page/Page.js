import React from 'react';

import SuggestionList from '../SuggestionList/SuggestionList';
import Description from '../Description/Description';
import './Page.scss';

const Page = () => (
  <div className="Page">
    <Description />
    <SuggestionList />
  </div>
);

export default Page;
