import FetchIPAddress from './components/DNS/FetchIPAddress';
import FetchData from './components/Fetch_API/FetchCall';

export default function App() {
    return (
        <>
            <FetchData />
            <FetchIPAddress />
        </>
    );
}