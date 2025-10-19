import FetchIPAddress from './components/DNS/FetchIPAddress';
import FetchData from './components/Fetch_API/FetchCall';
import UrlViewer from './components/URL | Async/URLParts';

export default function App() {
    return (
        <>
            <FetchData />
            <FetchIPAddress />
            <UrlViewer />
        </>
    );
}