// src/features/members/components/MembersToolbar.tsx
import React from "react"
import styles from "./MembersToolbar.module.css"

import "../styles/members-toolbar.css";

type Props = {
  search: string
  onSearchChange: (q: string) => void
  onAdd: () => void
  onImport: () => void
  onExport: () => void
  onFilter: () => void
}

/**
 * MembersToolbar component provides a toolbar UI for managing members.
 *
 * This component includes buttons for adding, importing and exporting members, a search bar and a filter button.
 * 
 * @param search - The current search query string.
 * @param onSearchChange - Callback function invoked when the search input changes.
 * @param onAdd - Callback function invoked when the "Add Member" button is clicked.
 * @param onImport - Callback function invoked when the "Import Members" button is clicked.
 * @param onExport - Callback function invoked when the "Export Members" button is clicked.
 * @param onFilter - Callback function invoked when the "Filters" button is clicked.
 *
 * @returns A toolbar with actions for adding, importing, exporting, searching, and filtering members.
 */
export default function MembersToolbar({
  search,
  onSearchChange,
  onAdd,
  onImport,
  onExport,
  onFilter,
}: Props) {
  return (
    <div className="toolbar">
      <div className="left">
        <h1>Members List</h1>
        <button className="addMember" onClick={() => onAdd()}>Add Member</button>
        <button className="importMembers" onClick={() => onImport()}>Import Members</button>
        <button className="exportMembers" onClick={() => onExport()}>Export Members (Excel)</button>
      </div>
      <div className="right">
        <input type="text" placeholder="Search..." className="searchInput" />
        <button className="filterButton">Filters</button>
      </div>
    </div>
  )
}
