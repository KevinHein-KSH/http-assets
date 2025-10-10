import FetchIPAddress from './components/DNS/fetchIPAddress';
import FetchData from './components/Fetch_API/fetchCall';
import UrlViewer from './components/URL/urlParts';

export default function App() {
    return (
        <>
            <FetchData />
            <FetchIPAddress />
            <UrlViewer />
        </>
    );
}