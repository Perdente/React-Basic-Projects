import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabins from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import { FilterType } from '../../enums/filterTypes';
import SortBy from '../../ui/SortBy';
import { SortTypes } from '../../enums/sortTypes';

const CabinTable = () => {
  const { cabins, isLoading } = useCabins();

  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get(FilterType.FilterField) || FilterType.FilterArray.at(0).value;

  // 1. Filter

  if (isLoading) return <Spinner />;

  let filteredCabins;

  if (filteredValue === FilterType.FilterArray.at(0).value) filteredCabins = cabins;

  if (filteredValue === FilterType.FilterArray.at(1).value)
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filteredValue === FilterType.FilterArray.at(2).value)
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2. Sort

  const sortBy = searchParams.get('sortBy') || SortTypes.SortArray.at(0).value;

  const [field, direction] = sortBy.split('-');

  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  // console.log(sortBy);
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
      </Table>
    </Menus>
  );
};

export default CabinTable;
