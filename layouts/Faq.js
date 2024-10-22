'use client';

import {useEffect, useState} from "react";

const Faq = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sheets');
        const result = await response.json();

        if (response.ok) {
          setData(result.data);
        } else {
          setError(result.error || 'An error occurred');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h2>Google Sheets Data</h2>
      <table>
        <thead>
        <tr>
          {data[0]?.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Faq;
