import React from 'react';
import {shallow} from 'enzyme';
import  HelloComp from '../client/ts-build/components/login/HelloComp.jsx' ;

test('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(
      <HelloComp labelOn="On" labelOff="Off" />
    );
    expect(checkbox.text()).toEqual('Off');
    console.info('text : ' + checkbox.text()) ;
    checkbox.find('input').simulate('change');
    console.info('text : ' + checkbox.text()) ;
    expect(checkbox.text()).toEqual('On');
});