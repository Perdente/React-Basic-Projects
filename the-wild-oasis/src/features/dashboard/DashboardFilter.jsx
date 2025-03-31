import { DashboardFilterTypes } from '../../enums/dashboardFilterTypes';
import Filter from '../../ui/Filter';

function DashboardFilter() {
  return <Filter filterField="last" options={DashboardFilterTypes} />;
}

export default DashboardFilter;
