import { useState } from 'react';

export default function Input({ placeholder, onChange }) {
  const [val, setVal] = useState(0);
  return (
    <div>
      <input 
        type="text" 
        placeholder={placeholder} 
        onChange={onChange} 
        className="border p-2 rounded" 
      />
      <button onClick={() => setVal(val + 1)}>Increment</button>
      <span data-testid="counter">{val}</span>
    </div>
  );
}