import React from 'react';
import { shallow } from 'enzyme';

import Spinner from './Spinner';
import RollingSpinner from './RollingSpinner';

describe('<Spinner />', () => {
  const wrapper = shallow(<Spinner />);

  it('should render a <RollingSpinner />', () => {
    expect(wrapper.find(RollingSpinner)).toHaveLength(1);
  });
});
