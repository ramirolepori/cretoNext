import { useEffect, useState } from 'react';

export default function Input({ placeholder, id, name, type, value, onChange, className }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInputValue(value);
    }
  }, [value]);

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={inputValue}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
}
