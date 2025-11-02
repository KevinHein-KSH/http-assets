import FetchIPAddress from './components/Ch2-DNS/FetchIPAddress';
import FetchData from './components/Ch1-Fetch_API/FetchCall';
import UrlViewer from './components/Ch3-URL/URLParts';
import TemplateContainer from './components/Template/TemplateContainer';

export default function App() {
    return (
        <>
            <FetchData />
            <FetchIPAddress />
            <UrlViewer />
            
            <TemplateContainer />
        </>
    );
}