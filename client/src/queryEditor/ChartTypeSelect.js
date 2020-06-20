import React from 'react';
import Select from '../common/Select';
import { handleChartTypeChange } from '../stores/queries';
import { useActions, useStoreState } from '../stores/unistore-hooks';
import chartDefinitions from '../utilities/chartDefinitions.js';

const actions = {
  handleChartTypeChange,
};

function mapStateToProps(state) {
  return {
    chartType: state.query && state.query.chart && state.query.chart.chartType,
  };
}

function ChartTypeSelect({ className, style }) {
  const { handleChartTypeChange } = useActions(actions);
  const { chartType } = useStoreState(mapStateToProps);

  const chartOptions = chartDefinitions.map((d) => {
    return (
      <option key={d.chartType} value={d.chartType}>
        {d.chartLabel}
      </option>
    );
  });

  return (
    <Select
      className={className}
      onChange={(event) => handleChartTypeChange(event.target.value)}
      style={style}
      value={chartType}
    >
      <option value="">No visualization</option>
      {chartOptions}
    </Select>
  );
}

export default React.memo(ChartTypeSelect);
