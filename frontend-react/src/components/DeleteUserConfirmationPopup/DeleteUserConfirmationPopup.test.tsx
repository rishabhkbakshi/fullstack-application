import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteUserConfirmationPopup from './DeleteUserConfirmationPopup';

describe('<DeleteUserConfirmationPopup />', () => {
  test('it should mount', () => {
    render(<DeleteUserConfirmationPopup show={true} onBtnClick={() => { }} />);

    const deleteUserConfirmationPopup = screen.getByTestId('DeleteUserConfirmationPopup');

    expect(deleteUserConfirmationPopup).toBeInTheDocument();
  });
});