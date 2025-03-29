import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../components/ContactForm';
import { vi } from 'vitest';

vi.mock('../services/api', () => ({
  addContact: vi.fn().mockResolvedValue({ id: 1, name: 'Test User', email: 'test@example.com' }),
  fetchContacts: vi.fn().mockResolvedValue([{ id: 1, name: 'Test User', email: 'test@example.com' }])
}));

describe('ContactForm', () => {
  it('shows error if fields are empty', () => {
    render(<ContactForm setContacts={vi.fn()} onClose={vi.fn()} />);
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText(/name and email are required/i)).toBeInTheDocument();
  });

  it('adds contact and closes modal', async () => {
    const setContacts = vi.fn();
    const onClose = vi.fn();
    render(<ContactForm setContacts={setContacts} onClose={onClose} />);
    
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(setContacts).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
