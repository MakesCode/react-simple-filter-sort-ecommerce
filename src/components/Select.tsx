import React from "react";

interface SelectOption {
  label: string;
  value: string;
}

export default function Select({
  options,
  label,
  name,
  defaultValue = 'default',
  onChange
}: {
  options: SelectOption[];
  label: string;
  name: string;
  defaultValue?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <div>
      <select
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
        className="select ph2 pv1 br2 bn">
        <option disabled value="default">
          {label}
        </option>
        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
