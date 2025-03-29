// src/__tests__/ContactItem.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactItem from '../components/ContactItem';
import { vi } from 'vitest';

vi.mock('../services/api', () => ({
  deleteContact: vi.fn().mockResolvedValue(undefined),
  updateContact: vi.fn().mockResolvedValue({ id: 1, name: 'Updated Name', email: 'updated@example.com' })
}));

describe('ContactItem', () => {
  const contact = { id: 1, name: 'Original Name', email: 'original@example.com' };

  it('edits a contact', async () => {
    const setContacts = vi.fn();
    render(<ContactItem contact={contact} setContacts={setContacts} />);
    
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByDisplayValue('Original Name'), { target: { value: 'Updated Name' } });
    fireEvent.change(screen.getByDisplayValue('original@example.com'), { target: { value: 'updated@example.com' } });
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(setContacts).toHaveBeenCalled();
      expect(screen.queryByText('Save')).not.toBeInTheDocument();
    });
  });

  it('deletes a contact after confirmation', async () => {
    const setContacts = vi.fn();
    render(<ContactItem contact={contact} setContacts={setContacts} />);
    
    fireEvent.click(screen.getByText('Delete'));
    const confirmDeleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(setContacts).toHaveBeenCalled();
    });
  });
});
