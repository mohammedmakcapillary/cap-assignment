import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CapTable from '@capillarytech/cap-ui-library/CapTable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import useQuery from '../../../lib/CustomHooks/useQuery';
import saga from './saga';
import reducer from './reducer';
import * as actions from './actions';
import { getIssuesList } from './selector';

const IssuesPage = ({ actions, issues }) => {
  const [issuesList, setIssuesList] = useState([]);
  const history = useHistory();
  const queryParams = useQuery();
  const currentPage = Number(queryParams.get('currentPage'));

  const getData = () => {
    const formattedData = (issuesList.length ? issuesList : []).map(issue => {
      const {
        id,
        number,
        title,
        state,
        created_at,
        user: { login },
      } = issue;
      return {
        key: id,
        id,
        number,
        title,
        state,
        created_at,
        created_by: login,
      };
    });
    return formattedData;
  };

  useEffect(
    () => {
      setIssuesList([...issues]);
    },
    [issues],
  );

  useEffect(() => {
    actions.loadIssues();
    if (!currentPage) {
      history.push({
        search: `?currentPage=1`,
      });
    }
  }, []);

  const handleRowClick = rowData => {
    history.push(`issues/${rowData.key}`);
  };

  const handlePagination = page => {
    history.push({
      search: `?currentPage=${page}`,
    });
  };

  return (
    <CapTable
      columns={columns}
      dataSource={getData()}
      pagination={{
        pageSize: 10,
        onChange: handlePagination,
        current: currentPage,
      }}
      onRow={record => ({
        onClick: () => handleRowClick(record),
      })}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  issues: getIssuesList(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'issues', saga });
const withReducer = injectReducer({ key: 'issues', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(IssuesPage);

export const columns = [
  {
    title: 'Issue Number',
    dataIndex: 'number',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'State', //open or close
    dataIndex: 'state',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
  },
  {
    title: 'Created By',
    dataIndex: 'created_by',
  },
];
