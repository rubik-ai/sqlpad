import React from 'react';
import { handleChartConfigurationFieldsChange } from '../stores/queries';
import { useActions, useStoreState } from '../stores/unistore-hooks';
import ChartInputs from './ChartInputs.js';

const actions = {
  handleChartConfigurationFieldsChange,
};

function ChartInputsContainer() {
  const { queryResult, chartType, fields } = useStoreState((state) => {
    return {
      queryResult: state.queryResult,
      chartType:
        state.query && state.query.chart && state.query.chart.chartType,
      fields: state.query && state.query.chart && state.query.chart.fields,
    };
  });
  const { handleChartConfigurationFieldsChange } = useActions(actions);

  return (
    <ChartInputs
      chartType={chartType}
      queryChartConfigurationFields={fields}
      onChartConfigurationFieldsChange={handleChartConfigurationFieldsChange}
      queryResult={queryResult}
    />
  );
}

export default React.memo(ChartInputsContainer);
