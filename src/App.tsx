import FetchIPAddress from './components/DNS/fetchIPAddress';
import FetchData from './components/Fetch_API/fetchCall';

export default function App() {
    return (
        <>
            <FetchData />
            <FetchIPAddress />
        </>
    );
}