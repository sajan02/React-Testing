import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

  /**
   * Factory function to create a Shallowwrapper for the App component.
   * @function setup
   * @param {object} props - Component props specfic to this setup.
   * @param {any} state - Initial state for setup
   * @returns {ShallowWrapper}
   */
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state);
  return wrapper;
}

/**
 * 
 * @param {shallowWrapper} wrapper 
 * @param {string} attr - Attribute to search on.- Enzyme shallow wrapper to search within.
 * @param {string} val - Value of attribute for search.
 * @returns {shallowWrapper}
 */
const findByTestArr = (wrapper, attr, val) => {
  return wrapper.find(`[${attr}="${val}"]`);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestArr(wrapper, 'data-test', 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestArr(wrapper, 'data-test', 'increment-button');
  expect(button.length).toBe(1);
});
test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestArr(wrapper, 'data-test', 'counter-display');
  expect(counterDisplay.length).toBe(1);
});
test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
})

test('clicking button increments counter display',() => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  
  // find button and click.
  const button = findByTestArr(wrapper, 'data-test', 'increment-button');
  button.simulate('click');

  // find display and test value
  const counterDisplay = findByTestArr(wrapper, 'data-test', 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
})
