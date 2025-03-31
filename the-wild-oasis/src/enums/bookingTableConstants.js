export const BookingTableConstants = {
  FilterOptions: [
    { value: 'all', label: 'All' },
    { value: 'checked-out', label: 'Checked out' },
    { value: 'checked-in', label: 'Checked in' },
    { value: 'unconfirmed', label: 'Unconfirmed' },
  ],
  SortOptions: [
    { value: 'startDate-desc', label: 'Sort by date (recent-early)' },
    { value: 'startDate-asc', label: 'Sort by date (early-recent)' },
    { value: 'totalPrice-desc', label: 'Sort by amount (high-low)' },
    { value: 'totalPrice-asc', label: 'Sort by amount (low-high)' },
  ],
};
