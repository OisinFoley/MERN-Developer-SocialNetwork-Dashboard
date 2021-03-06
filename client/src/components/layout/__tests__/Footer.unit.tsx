import Footer from '../Footer';
import { shallow } from 'enzyme';
import React from 'react';

it('expect to render Footer component', () => {
  const wrapper = shallow(<Footer  />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.text()).toEqual(expect.stringContaining('Copyright'))
});

