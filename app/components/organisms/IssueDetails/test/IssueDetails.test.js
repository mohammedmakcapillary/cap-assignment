import { render, screen } from '@testing-library/react';
import IssueDetails from '../IssueDetails';

describe('Issues Details Page', () => {
  test('renders correctly', () => {
    render(<IssueDetails />);
    const issueListingTable = screen.getByRole('table');
    expect(issueListingTable).toBeInTheDocument();
  });
});
