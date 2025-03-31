import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import { FilterType } from '../../enums/filterTypes';
import SortBy from '../../ui/SortBy';
import { SortTypes } from '../../enums/sortTypes';

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter filterField={FilterType?.FilterField} options={FilterType?.FilterArray} />
      <SortBy options={SortTypes?.SortArray} />
    </TableOperations>
  );
};

export default CabinTableOperations;
