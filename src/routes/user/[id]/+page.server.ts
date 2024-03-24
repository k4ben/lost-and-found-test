
import prisma, { getCategories, getUserById } from '$lib/server/prisma';
import type { Category, Image, Item, User, Location, School } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { convertToHierarchy } from '$lib/functions';

export type UserUnionType = (User & 
                      {Item: (Item & 
                        {Image: Image[],
                        Category: Category,
                        Location: Location & {School: School}})[]})

export const load: PageServerLoad = async ({ params })=> {
  const [user, categories] = await Promise.all([getUserById(params.id), getCategories()])
	return { user, categories } as const;
}