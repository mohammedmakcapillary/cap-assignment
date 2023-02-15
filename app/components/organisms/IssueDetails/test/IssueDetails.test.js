import { render, screen } from '@testing-library/react';
import IssueDetails from '../IssueDetails';

describe('Issues Details Page', () => {
  it('renders no issue found', () => {
    render(<IssueDetails />);
    const noIssueFound = screen.getByText(/no issue details found/i);
    expect(noIssueFound).toBeInTheDocument();
  });

  it('renders status button', () => {
    render(<IssueDetails />);
    const statusButton = screen.getByRole('button');
    expect(statusButton).toBeInTheDocument();
  });
});
