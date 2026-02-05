import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

const Button = (props) => {
  const {
    ariaLabel,
    className,
    onClick,
    active = false,
    children,
    type = 'button',
    role = 'button',
    onKeyPress,
    mode = '',
    tabIndex = 0,
    ...restProps
  } = props

  const classButton = classNames(
    styles.button,
    className,
    {
      [styles.active]: active,
      [styles.buttonDefault]: mode === '',
      [styles.buttonCustom]: mode === 'custom'
    }
  );

  if (mode === 'custom') {
    return (
      <div
        className={classButton}
        onClick={onClick}
        role="button"
        tabIndex={tabIndex}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onKeyPress) {
            e.preventDefault();
            onKeyPress(e);
          }
        }}
        {...restProps}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      className={classButton}
      onClick={onClick}
      type={type}
      role={role}
      {...restProps}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;