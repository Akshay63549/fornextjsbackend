import { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
    const [data, setData] = useState(null);
    // https://nextjspwa-lac.vercel.app/api/user/g
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('https://nextjspwa-lac.vercel.app/api/user/akshay');
                const response = await axios.post('https://nextjspwa-lac.vercel.app/api/user/akshay');
                // const response = await axios.get('https://nextjspwa-lac.vercel.app/api/hello');
                console.log(response?.data)
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        // fetchData();
    }, []);
// console.log(data?.message)
    return (
        <div>
            {/* Render data */}
            {data && (
                <p>{data?.message}</p>
            )}
        </div>
    );
}

export default MyComponent;
