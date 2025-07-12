import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await db
		.select()
		.from(table.project)
		.where(eq(table.project.status, 'published'))
		.orderBy(table.project.updatedAt);

	return { projects };
};