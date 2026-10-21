import { useEffect, useState } from 'react';

export default function FetchComponent() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(resData => setData(resData.message || 'Loaded'))
      .catch(() => setData('Error'));
  }, []);

  return <div>{data || 'Loading...'}</div>;
}