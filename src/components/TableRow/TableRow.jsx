import React, { memo } from 'react';
import ExpandButton from "@/components/ExpandButton";
import styles from './TableRow.module.scss';

const TableRow = (props) => {
  const {
    item,
    level,
    isExpanded,
    onToggle
  } = props

  const handleRowClick = () => {
    if (item.children.length > 0) {
      onToggle(item.id)
    }
  };

  return (
    <tr
      role="row"
      onClick={handleRowClick}
      data-level={level}
      data-has-children={item.children.length > 0}
    >
      <td role="gridcell">
        <div className={styles[`idContent-${level}`]}>
          <ExpandButton
            ariaLabel={isExpanded ? "Expanded" : "Collapsed"}
            isExpanded={isExpanded}
            hasChildren={item.children.length > 0}
          />
          <span>{item.id}</span>
        </div>
      </td>
      <td role="gridcell">
        <div className={styles[`nameContent-${level}`]}>
          {item.name}
        </div>
      </td>
      <td role="gridcell">{item.email}</td>
      <td role="gridcell">{item.balance}</td>
      <td role="gridcell">
        <span className={item.isActive ? styles.active : styles.inactive}>
          {item.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
    </tr>
  );
};

export default memo(TableRow);