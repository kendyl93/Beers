import React from 'react';
import { shallow } from 'enzyme';

import Spinner from './Spinner';

describe('Spinner', () => {
  const wrapper = shallow(<Spinner />);

  it('should have a RollingSpinner component', () => {
    // There should be only one button
    expect(wrapper.find('svg')).toHaveLength(1);
  });
});
