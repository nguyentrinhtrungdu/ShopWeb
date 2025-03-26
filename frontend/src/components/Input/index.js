import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from './Input.module.scss'
import classNames from 'classnames/bind';

const cx= classNames.bind(styles)

const InputField = ({
  label,
  type = "text",
  placeholder,
  error,
  disabled,
  ...props
}) => {
  return (
    <div className={cx('wrapper')}>
      {label && <Label className={cx('')}>{label}</Label>}
      <div
        className={cx('contents')}
      >
        <Input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className=""
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
