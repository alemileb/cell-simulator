import React from 'react';
import enzyme from 'enzyme';
import App from './App';

import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

// Wrapper will know the type of the component.
const wrapper = enzyme.shallow(<App />);

describe('Cell board rendering', () => {
  let component = wrapper.find('.matrix');
  it('should render the cell board', () => {
    
    expect(component.length).toBe(1);
    expect(component.find('Row').length).toBe(8);
    expect(component.find('Col').length).toBe(64);
    expect(component.find('Col.alive').length).toBe(0);
  });

  it('should toggle cell status', () => {
    //set a cell alive
    let secondRow = component.find('Row').at(1);
    secondRow.find('Col').at(0).simulate("click");
    wrapper.update();
    secondRow = wrapper.find('.matrix').find('Row').at(1);
    expect(secondRow.find('Col.alive').length).toBe(1);
    
     //set a cell dead
    secondRow.find('Col').at(0).simulate("click");
    wrapper.update();
    secondRow = wrapper.find('.matrix').find('Row').at(1);
    expect(secondRow.find('Col.alive').length).toBe(0);
  });


  describe('Cell simulation', () => {
    let component = wrapper.find('.matrix');
    it('next generation should be same as initial state', () => {
      
      //set cells alive 2 x 2 square block
      /*
      let secondRow = component.find('Row').at(1);
      secondRow.find('Col').at(1).props().onClick();
      wrapper.update();
      secondRow.find('Col').at(2).props().onClick();
      wrapper.update();
      let thirdRow = component.find('Row').at(2);
      thirdRow.find('Col').at(1).props().onClick();
      
      wrapper.update();
      thirdRow.find('Col').at(2).props().onClick();
      wrapper.update()
      console.log(wrapper.find('.matrix').find('Row').at(2).debug());
      expect(wrapper.find('.matrix').find('Col.alive').length).toBe(4);
      */
    });
  })
  
});
