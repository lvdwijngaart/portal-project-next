// app/teams/components/TeamsTabBar.tsx  (or wherever you keep it)

import styles from '../styles/tabbar.module.css';

interface TeamsTabBarProps {
  tabs: ('mens' | 'womens')[];
  activeTab?: 'mens' | 'womens';
  setActiveTab: (tab: 'mens' | 'womens') => void;
}

export default function TeamsTabBar({
  tabs = ['mens', 'womens'],
  activeTab = 'mens',
  setActiveTab,
}: TeamsTabBarProps) {
  // When we have exactly 2 tabs, their indices will be 0 and 1.
  // The indicator’s `left` value will be 0% for index 0, 50% for index 1.
  const activeIndex = tabs.indexOf(activeTab);

  return (
    <div className="teams-tab-bar">
      <ul className={styles.tabs}>
        {/* 1) The sliding indicator DIV */}
        <div
          className={styles.indicator}
          style={{ left: `${activeIndex * 50}%` }}
        />

        {/* 2) The actual tab items */}
        {tabs.map((tabKey) => {
          const isActive = activeTab === tabKey;
          const label = tabKey === 'mens' ? "Men's" : "Women's";

          return (
            <li key={tabKey} className={styles.tabItem}>
              <button
                className={`${styles.tabButton} ${isActive ? styles.activeButton : ''}`}
                onClick={() => setActiveTab(tabKey)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
