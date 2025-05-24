"use server";

import { PrismaClient } from "@prisma/client";
import type { Prisma } from '@prisma/client';

// Create Prisma client instance
const prisma = new PrismaClient();

// Type alias for Member to match Prisma's generated type
type Member = Prisma.MemberGetPayload<{}>;
type MemberUpdate = Prisma.MemberUpdateInput;

/**
 * Retrieves a list of members from the database, ordered by last name and first name in ascending order.
 *
 * @returns  A promise that resolves to an array of Member objects.
 * @throws Will throw an error if fetching members from the database fails.
 */
export async function getMembers(): Promise<Member[]> {
  try {
    return await prisma.member.findMany({
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
    });
  } catch (error) {
    console.error('Failed to fetch members:', error);
    throw new Error('Failed to fetch members');
  }
}

/**
 * Retrieves a member by their unique identifier.
 *
 * @param id - The unique identifier of the member to retrieve.
 * @returns A promise that resolves to the `Member` object if found, or `null` if no member exists with the given ID.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function getMemberById(id: string): Promise<Member | null> {
  try {
    return await prisma.member.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Failed to fetch member with ID ${id}:`, error);
    throw new Error(`Failed to fetch member with ID ${id}`);
  }
}


/**
 * Creates a new member in the database using the provided data.
 *
 * @param data - The member data to create, omitting `id`, `createdAt`, and `updatedAt` fields. These fields are automatically managed by Prisma.
 * @returns A promise that resolves to the created `Member` object.
 * @throws Will throw an error if the member creation fails.
 */
export async function createMember(data: Omit< Prisma.MemberCreateInput, "id" | "createdAt" | "updatedAt" >): Promise<Member> {
  try {
    // Prisma automatically converts camelCase to snake_case based on your schema
    return await prisma.member.create({
      data,
    });
  } catch (error) {
    console.error('Failed to create member:', error);
    throw new Error('Failed to create member');
  }
}

/**
 * Updates a member in the database with the specified updates.
 *
 * @param id - The unique identifier of the member to update.
 * @param updates - An object containing the fields to update for the member.
 * @returns A promise that resolves to the updated Member object.
 * @throws Will throw an error if the update operation fails.
 */
export async function updateMember(id: string, updates: MemberUpdate): Promise<Member> {
  try {
    return await prisma.member.update({
      where: { id },
      data: updates,
    });
  } catch (error) {
    console.error(`Failed to update member with ID ${id}:`, error);
    throw new Error(`Failed to update member with ID ${id}`);
  }
}

/**
 * Deletes a member from the database by their unique identifier.
 *
 * @param id - The unique identifier of the member to delete.
 * @returns A promise that resolves when the member has been deleted.
 * @throws Will throw an error if the deletion fails.
 */
export async function deleteMember(id: string): Promise<void> {
  try {
    await prisma.member.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Failed to delete member with ID ${id}:`, error);
    throw new Error(`Failed to delete member with ID ${id}`);
  }
}