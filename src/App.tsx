import FetchIPAddress from './components/Ch2:DNS/fetchIPAddress';
import FetchData from './components/Ch1:Fetch_API/fetchCall';
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