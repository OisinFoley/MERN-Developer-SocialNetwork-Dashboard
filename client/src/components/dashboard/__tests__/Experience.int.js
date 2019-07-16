import React from 'react';
import { mount } from 'enzyme';
import { Experience } from '../Experience';
import { mockExperience } from '../../../__mocks__/mockExperience.js';

const deleteExperience = jest.fn();
const expState = {
  experience: mockExperience,
  deleteExperience,
  errors: {}
}

describe('<Education />', () => {
  it("mounts the Experience component and, when delete button is pressed and confirmed, then deleteExperience() is called", () => {
    const wrapper = mount(<Experience {...expState} />);

    wrapper.find('button[data-target="#deleteExperienceModal-1"]').simulate('click');
    let deleteExperienceModal = wrapper.find('[modalTitle="Delete Experience"]');
    deleteExperienceModal = deleteExperienceModal.at(0);
    deleteExperienceModal.find(`button[id="${mockExperience[0]._id}"]`).simulate('click');

    expect(deleteExperience.mock.calls.length).toBe(1);
  });
});