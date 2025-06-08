import React, { ReactNode } from "react";

import styles from "./admin-styles.module.css";

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Admin Layout component
 * This component serves as a div wrapper for all admin pages for styling purposes.
 * @param children - The child components to be rendered within the layout: an admin page 
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={styles.adminPage}>
      {children}
    </div>
  );
}