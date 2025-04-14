import React from 'react';

const FormRow = ({
  labelText,
  name,
  value,
  type,
  onChange,
  min,
  max,
  step,
  exampleText,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-primary-600 font-medium">{labelText}</h3>
      {exampleText && (
        <p className="text-gray-400 text-sm mt-1">{exampleText}</p>
      )}
      <input
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full px-3 py-2 mt-[-2rem] rounded border border-gray-300 bg-transparent text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
      />
    </div>
  );
};

export default FormRow;
