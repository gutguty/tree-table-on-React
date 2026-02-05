import React from 'react';
import styles from './Table.module.scss';
import {items} from "@/data/items";
import Button from "@/components/Button";
import {useTable} from "@/hooks/useTable";
import {useTree} from "@/hooks/useTree";
import TableRow from "@/components/TableRow";

const Table = () => {
  const {
    treeData,
    sortState,
    sortStatus,
    handleSortEmail,
    handleSortBalance,
    handleStatus
  } = useTable(items);

  const {
    visibleItems,
    expandRow,
    toggleRow
  } = useTree(treeData)

  const getArrow = (type) => {
    if (sortState.type === type && sortState.direction === 'asc') {
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Arrow-up-outline SVG Icon</title><path fill="currentColor" d="M8.53 10.53a.75.75 0 1 1-1.06-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 1 1-1.06 1.06l-2.72-2.72v9.69a.75.75 0 0 1-1.5 0V7.81z"/></svg>;
    } else if (sortState.type === type && sortState.direction === 'desc') {
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Arrow-down-outline SVG Icon</title><path fill="currentColor" d="m12.75 16.19l2.72-2.72a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06l2.72 2.72V6.5a.75.75 0 0 1 1.5 0z"/></svg>;
    }
    return '';
  };

  return (
    <div className={styles.table}>
      <div className={styles.table__wrapper}>
        <h1 className={styles.table__header}>Table Content</h1>
        <table className={styles.table__body} role="grid" aria-label="User data table">
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col" role="columnheader">ID</th>
              <th scope="col" role="columnheader">Name</th>
              <th scope="col" role="columnheader">
                <Button
                  mode="custom"
                  onClick={handleSortEmail}
                  active={sortState.type === 'email'}
                  ariaLabel="Sort by emsil"
                >
                  Email{getArrow('email')}
                </Button>
              </th>
              <th scope="col" role="columnheader">
                <Button
                  mode="custom"
                  onClick={handleSortBalance}
                  active={sortState.type === 'balance'}
                  ariaLabel="Sort by balance"
                >
                  Balance{getArrow('balance')}
                </Button>
              </th>
              <th scope="col" role="columnheader">
                <Button
                  mode="custom"
                  onClick={handleStatus}
                  active={sortStatus !== null}
                  ariaLabel="Sort by status"
                >
                  Status
                  {sortStatus === true && ' (Active)'}
                  {sortStatus === false && ' (Inactive)'}
                </Button>
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {visibleItems.map((item) => (
              <TableRow
                key={item.id}
                item={item}
                level={item.level}
                isExpanded={expandRow.has(item.id)}
                onToggle={toggleRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;