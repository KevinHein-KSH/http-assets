import FetchIPAddress from './components/Ch2-DNS/FetchIPAddress';
import FetchData from './components/Ch1-Fetch_API/FetchCall';
import UrlViewer from './components/Ch3-URL/URLParts';
import TemplateContainer from './components/Template/TemplateContainer';
import HeaderApiKey from './components/Ch6-Header/HeaderApiKey';
import Json from './components/Ch7-JSON/JsonDisplay';
import "github-markdown-css/github-markdown.css";

export default function App() {
    return (
        <>
            <FetchData />
            <FetchIPAddress />
            <UrlViewer />
            <HeaderApiKey />
            <Json />
            
            {/* <TemplateContainer /> */}
        </>
    );
}