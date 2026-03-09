import React, { useState, useEffect } from 'react';

const AsyncDemo: React.FC = () => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            if (!response.ok) throw new Error('Failed to fetch');
            const result = await response.json();
            setData(JSON.stringify(result, null, 2));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Async Demo</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {data && <pre>{data}</pre>}
            <button onClick={fetchData}>Fetch Data</button>
        </div>
    );
};

export default AsyncDemo;