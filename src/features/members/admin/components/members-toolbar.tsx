// src/features/members/components/MembersToolbar.tsx
import React from "react"
import styles from "./MembersToolbar.module.css"

import "../../styles/members-toolbar.css";

type Props = {
  search: string
  onSearchChange: (q: string) => void
  onAdd: () => void
  onImport: () => void
  onExport: () => void
  onFilter: () => void
}

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
        <h2 className="heading">Members List</h2>
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
