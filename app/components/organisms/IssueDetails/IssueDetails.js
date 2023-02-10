import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CapCard from '@capillarytech/cap-ui-library/CapCard';
import CapButton from '@capillarytech/cap-ui-library/CapButton';

import { getIssuesList } from '../../pages/IssuesPage/selector';

const IssueDetails = ({ issues }) => {
  const { issueId } = useParams();
  const [issueData, setIssueData] = useState(null);

  const getIssueDetails = () => {
    const issueDetails = issues
      ? issues.find(data => data.id === Number(issueId))
      : null;
    setIssueData(issueDetails);
  };

  useEffect(
    () => {
      getIssueDetails();
    },
    [issues, issueId],
  );

  if (!!issueData) {
    const { title, state, body } = issueData;

    return (
      <div>
        <CapCard title={title} extra={<CapButton>{state}</CapButton>}>
          <div>{body}</div>
        </CapCard>
      </div>
    );
  }

  return <div>No Issue Details Found</div>;
};

const mapStateToProps = createStructuredSelector({
  issues: getIssuesList(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(IssueDetails);
