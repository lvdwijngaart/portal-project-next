"use server";

// src/services/membersService.ts
import { sql } from "@/lib/db"
import type { Member } from "../types/Member"

// Fetch all members
export async function getMembers(): Promise<Member[]> {
  return sql<Member[]>`
    SELECT * 
    FROM members
    ORDER BY last_name, first_name
  `
}

// Fetch a single member by ID
export async function getMemberById(id: string): Promise<Member | null> {
  const [member] = await sql<Member[]>`
    SELECT *
    FROM members
    WHERE id = ${id}
  `
  return member || null
}

// Create a new member
export async function createMember(data: Omit<Member, "id">): Promise<Member> {
  const [member] = await sql<Member[]>`
    INSERT INTO members ${sql(data)}
    RETURNING *
  `
  return member
}

// Update an existing member
export async function updateMember(id: string, updates: Partial<Member>): Promise<Member> {
  const [member] = await sql<Member[]>`
    UPDATE members
    SET ${sql(updates)}
    WHERE id = ${id}
    RETURNING *
  `
  return member
}

// Delete a member
export async function deleteMember(id: string): Promise<void> {
  await sql`
    DELETE FROM members
    WHERE id = ${id}
  `
}
