import { Tab, Tabs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabViewProps {
  tabs: TabItem[]; // choice of tabs to display between chapter view and note view
  activeTab: number; // currently active tab index (above tab array)
  onTabChange: (index: number) => void; // callback when tab is changed send to parent from child
}

export default function TabView({
  tabs,
  activeTab,
  onTabChange,
}: TabViewProps) {
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue); // change active tab to parent
  };

  return (
    <>
      <Tabs value={activeTab} onChange={handleChange} centered className="pb-6">
        <Tab icon={<HomeIcon />} iconPosition="start" label="Home" />
        <Tab icon={<TextSnippetIcon />} iconPosition="start" label="Note" />
      </Tabs>

      {/* Render the active tab's content */}
      <div>{tabs[activeTab]?.content}</div>
    </>
  );
}
