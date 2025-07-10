import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Get the first resume (assuming single user)
	const [resume] = await db
		.select()
		.from(table.resume)
		.limit(1);

	if (!resume) {
		return {
			resume: null,
			experiences: [],
			education: [],
			skills: [],
			socialLinks: []
		};
	}

	// Fetch all related data
	const [experiences, education, skills, socialLinks] = await Promise.all([
		db.select().from(table.experience).where(eq(table.experience.resumeId, resume.id)).orderBy(table.experience.order),
		db.select().from(table.education).where(eq(table.education.resumeId, resume.id)).orderBy(table.education.order),
		db.select().from(table.skill).where(eq(table.skill.resumeId, resume.id)).orderBy(table.skill.order),
		db.select().from(table.socialLink).where(eq(table.socialLink.resumeId, resume.id)).orderBy(table.socialLink.order)
	]);

	return {
		resume,
		experiences,
		education,
		skills,
		socialLinks
	};
};