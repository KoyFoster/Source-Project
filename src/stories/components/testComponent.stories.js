// YourComponent.stories.js

import React from 'react';
import { TreeDropDown } from '../../Components/Forms/Fields';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'TreeDropDown',
  component: TreeDropDown,

  // UI Argument types
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <TreeDropDown {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
  nodes: [
    { value: '1', label: 'one' },
    { value: '2', label: 'two', children: [{ value: '3', label: 'three' }] },
  ],
};
