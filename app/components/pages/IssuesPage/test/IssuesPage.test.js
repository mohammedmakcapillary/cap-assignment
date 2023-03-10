import { render, screen } from '@testing-library/react';

import IssuesPage from '../IssuesPage';
import { issuesList } from './mockData';

describe('Issues List Page', () => {
  it('renders correctly', () => {
    render(<IssuesPage />);
    const issueListingTable = screen.getByRole('table');
    expect(issueListingTable).toBeInTheDocument();
  });

  it('renders 3 issues', () => {
    const actions = {
      loadIssues: jest.fn(),
    };
    render(<IssuesPage issues={issuesList} actions={actions} />);
    const issueListingTableRow = screen.getAllByRole('row');
    expect(issueListingTableRow).toHaveLength(3);
  });

  it('renders header correctly', () => {
    render(<IssuesPage />);
    const issueNumberCol = screen.getByRole('columnheader', {
      name: /issue number/i,
    });
    expect(issueNumberCol).toBeInTheDocument();

    const titleCol = screen.getByRole('columnheader', {
      name: /title/i,
    });
    expect(titleCol).toBeInTheDocument();

    const stateCol = screen.getByRole('columnheader', {
      name: /state/i,
    });
    expect(stateCol).toBeInTheDocument();

    const createdAtCol = screen.getByRole('columnheader', {
      name: /created at/i,
    });
    expect(createdAtCol).toBeInTheDocument();

    const createdByCol = screen.getByRole('columnheader', {
      name: /created by/i,
    });
    expect(createdByCol).toBeInTheDocument();
  });

  it('renders pagination list', () => {
    const actions = {
      loadIssues: jest.fn(),
    };
    render(<IssuesPage issues={issuesList} actions={actions} />);
    const paginationListMenu = screen.getByRole('list');
    expect(paginationListMenu).toBeInTheDocument();
  });
});
