import React from 'react';
import { shallow } from 'enzyme';

import LoadingOrError from './LoadingOrError';
import Spinner from './Spinner/Spinner';
import ErrorView from './Error/ErrorView';

describe('<LoadingOrError/>', () => {
  it('should render a <ErrorView/>', () => {
    const error = { error: 'Something went wrong' };
    const withError = shallow(<LoadingOrError error={error} />);

    expect(withError.find(ErrorView)).toHaveLength(1);
  });

  it('should render a <Spinner/>', () => {
    const withSpinner = shallow(<LoadingOrError />);

    expect(withSpinner.find(Spinner)).toHaveLength(1);
  });
});
