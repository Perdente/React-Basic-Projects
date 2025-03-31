import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';
import { BookingTableConstants } from '../../enums/bookingTableConstants';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="status" options={BookingTableConstants.FilterOptions} />
      <SortBy options={BookingTableConstants.SortOptions} />
    </TableOperations>
  );
}

export default BookingTableOperations;
