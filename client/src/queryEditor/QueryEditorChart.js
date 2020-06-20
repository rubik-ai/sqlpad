import React from 'react';
import SqlpadTauChart from '../common/SqlpadTauChart';
import { useStoreState } from '../stores/unistore-hooks';

function mapStateToProps(state) {
  return {
    queryId: (state.query && state.query.id) || 'new',
    isRunning: state.isRunning,
    queryResult: state.queryResult,
    chartConfiguration: state.query && state.query.chart,
  };
}

function ConnectedChart(props) {
  const state = useStoreState(mapStateToProps);
  return <SqlpadTauChart {...props} {...state} />;
}

export default ConnectedChart;
