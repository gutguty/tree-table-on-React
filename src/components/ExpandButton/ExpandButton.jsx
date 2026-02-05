import React, {memo} from 'react';
import styles from './ExpandButton.module.scss'
import classNames from 'classnames';

const ExpandButton = (props) => {
  const {
    isExpanded,
    hasChildren,
    className,
    ariaLabel
  } = props

  if (!hasChildren) {
    return <span className={styles.placeholder}/>
  }

  return (
    <span
      className={classNames(styles.expandButton, className)}
      aria-label={ariaLabel || (isExpanded ? "Collapse row" : "Expand row")}
      role="button"
      tabIndex={0}
    >
      <span className={classNames(styles.icon, {[styles.expanded]: isExpanded})}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Play SVG Icon</title><path fill="currentColor" d="M7 6v12l10-6z"/></svg>
      </span>
    </span>
  );
};

export default memo(ExpandButton);