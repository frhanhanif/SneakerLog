import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  error?: boolean;
  hint?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  onChange,
  className = "",
  defaultValue = "",
  hint,
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value); // Trigger parent handler
  };

  return (
    <>
    <select
      className={`h-10 sm:h-11 text-xs sm:text-sm w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
        selectedValue
          ? "text-gray-800 dark:text-white/90"
          : "text-gray-600 dark:text-gray-400"
      } ${className}`}
      value={selectedValue}
      onChange={handleChange}
    >

      { placeholder ?       
      <option
        value=""
        disabled
        className="text-xs sm:text-sm text-gray-800 dark:bg-gray-900 dark:text-gray-400"
      >
         <p className="text-xs sm:text-sm">{placeholder}</p>
      </option> : null
      }

      {/* Map over options */}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-xs sm:text-sm text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option.label}
        </option>
      ))}
    </select>
    {hint && <p className="text-gray-500 text-xs mt-1.5">{hint}</p>}
    </>
    
  );
};

export default Select;
