

export default function TabBar({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <nav className="tab-bar">
      <ul className="tab-list">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`tab-item${tab === activeTab ? " active" : ""}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </nav>
  );
}