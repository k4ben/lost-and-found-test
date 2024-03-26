import { addItem } from '$lib/server/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { Type, Description, CategoryID, UserID, SchoolID, locationName } = await request.json();
	try {
		await addItem(Type, Description, BigInt(CategoryID), BigInt(UserID), BigInt(SchoolID), locationName);
		return json({status: 1});
	} catch (e) {
		return json({status: 0});
	}
};