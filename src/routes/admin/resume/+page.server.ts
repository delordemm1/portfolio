import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	
	// Get the first resume (assuming single user)
	const [resume] = await db
		.select()
		.from(table.resume)
		.limit(1);

	if (!resume) {
		return {
			user,
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
		user,
		resume,
		experiences,
		education,
		skills,
		socialLinks
	};
};

export const actions: Actions = {
	updateResume: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const fullName = formData.get('fullName');
		const title = formData.get('title');
		const email = formData.get('email');
		const phone = formData.get('phone');
		const location = formData.get('location');
		const website = formData.get('website');
		const summary = formData.get('summary');

		// Validation
		if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
			return fail(400, { message: 'Full name is required' });
		}

		if (!title || typeof title !== 'string' || title.trim().length === 0) {
			return fail(400, { message: 'Title is required' });
		}

		if (!email || typeof email !== 'string' || email.trim().length === 0) {
			return fail(400, { message: 'Email is required' });
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email.trim())) {
			return fail(400, { message: 'Please enter a valid email address' });
		}

		try {
			// Check if resume exists
			const [existingResume] = await db
				.select()
				.from(table.resume)
				.limit(1);

			const resumeData = {
				fullName: fullName.trim(),
				title: title.trim(),
				email: email.trim(),
				phone: phone && typeof phone === 'string' ? phone.trim() || null : null,
				location: location && typeof location === 'string' ? location.trim() || null : null,
				website: website && typeof website === 'string' ? website.trim() || null : null,
				summary: summary && typeof summary === 'string' ? summary.trim() || null : null,
				updatedAt: new Date()
			};

			if (existingResume) {
				// Update existing resume
				await db
					.update(table.resume)
					.set(resumeData)
					.where(eq(table.resume.id, existingResume.id));
			} else {
				// Create new resume
				await db.insert(table.resume).values({
					id: generateId(),
					...resumeData
				});
			}

			return { success: true, message: 'Resume updated successfully' };
		} catch (error) {
			console.error('Error updating resume:', error);
			return fail(500, { message: 'Failed to update resume' });
		}
	},

	addExperience: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const company = formData.get('company');
		const position = formData.get('position');
		const startDate = formData.get('startDate');
		const endDate = formData.get('endDate');
		const description = formData.get('description');
		const location = formData.get('location');

		if (!company || typeof company !== 'string' || company.trim().length === 0) {
			return fail(400, { message: 'Company is required' });
		}

		if (!position || typeof position !== 'string' || position.trim().length === 0) {
			return fail(400, { message: 'Position is required' });
		}

		if (!startDate || typeof startDate !== 'string' || startDate.trim().length === 0) {
			return fail(400, { message: 'Start date is required' });
		}

		try {
			const resumeId = await getOrCreateResumeId();
			
			// Get the highest order number
			const experiences = await db
				.select()
				.from(table.experience)
				.where(eq(table.experience.resumeId, resumeId));

			const maxOrder = experiences.length > 0 ? Math.max(...experiences.map(e => e.order)) : -1;

			await db.insert(table.experience).values({
				id: generateId(),
				resumeId,
				company: company.trim(),
				position: position.trim(),
				startDate: startDate.trim(),
				endDate: endDate && typeof endDate === 'string' ? endDate.trim() || null : null,
				description: description && typeof description === 'string' ? description.trim() || null : null,
				location: location && typeof location === 'string' ? location.trim() || null : null,
				order: maxOrder + 1
			});

			return { success: true, message: 'Experience added successfully' };
		} catch (error) {
			console.error('Error adding experience:', error);
			return fail(500, { message: 'Failed to add experience' });
		}
	},

	updateExperience: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const id = formData.get('id');
		const company = formData.get('company');
		const position = formData.get('position');
		const startDate = formData.get('startDate');
		const endDate = formData.get('endDate');
		const description = formData.get('description');
		const location = formData.get('location');

		if (!id || typeof id !== 'string') {
			return fail(400, { message: 'Experience ID is required' });
		}

		if (!company || typeof company !== 'string' || company.trim().length === 0) {
			return fail(400, { message: 'Company is required' });
		}

		if (!position || typeof position !== 'string' || position.trim().length === 0) {
			return fail(400, { message: 'Position is required' });
		}

		if (!startDate || typeof startDate !== 'string' || startDate.trim().length === 0) {
			return fail(400, { message: 'Start date is required' });
		}

		try {
			await db
				.update(table.experience)
				.set({
					company: company.trim(),
					position: position.trim(),
					startDate: startDate.trim(),
					endDate: endDate && typeof endDate === 'string' ? endDate.trim() || null : null,
					description: description && typeof description === 'string' ? description.trim() || null : null,
					location: location && typeof location === 'string' ? location.trim() || null : null
				})
				.where(eq(table.experience.id, id));

			return { success: true, message: 'Experience updated successfully' };
		} catch (error) {
			console.error('Error updating experience:', error);
			return fail(500, { message: 'Failed to update experience' });
		}
	},

	deleteExperience: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const id = formData.get('id');

		if (!id || typeof id !== 'string') {
			return fail(400, { message: 'Experience ID is required' });
		}

		try {
			await db.delete(table.experience).where(eq(table.experience.id, id));
			return { success: true, message: 'Experience deleted successfully' };
		} catch (error) {
			console.error('Error deleting experience:', error);
			return fail(500, { message: 'Failed to delete experience' });
		}
	},

	addEducation: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const institution = formData.get('institution');
		const degree = formData.get('degree');
		const field = formData.get('field');
		const startDate = formData.get('startDate');
		const endDate = formData.get('endDate');
		const gpa = formData.get('gpa');
		const description = formData.get('description');

		if (!institution || typeof institution !== 'string' || institution.trim().length === 0) {
			return fail(400, { message: 'Institution is required' });
		}

		if (!degree || typeof degree !== 'string' || degree.trim().length === 0) {
			return fail(400, { message: 'Degree is required' });
		}

		if (!startDate || typeof startDate !== 'string' || startDate.trim().length === 0) {
			return fail(400, { message: 'Start date is required' });
		}

		try {
			const resumeId = await getOrCreateResumeId();
			
			// Get the highest order number
			const education = await db
				.select()
				.from(table.education)
				.where(eq(table.education.resumeId, resumeId));

			const maxOrder = education.length > 0 ? Math.max(...education.map(e => e.order)) : -1;

			await db.insert(table.education).values({
				id: generateId(),
				resumeId,
				institution: institution.trim(),
				degree: degree.trim(),
				field: field && typeof field === 'string' ? field.trim() || null : null,
				startDate: startDate.trim(),
				endDate: endDate && typeof endDate === 'string' ? endDate.trim() || null : null,
				gpa: gpa && typeof gpa === 'string' ? gpa.trim() || null : null,
				description: description && typeof description === 'string' ? description.trim() || null : null,
				order: maxOrder + 1
			});

			return { success: true, message: 'Education added successfully' };
		} catch (error) {
			console.error('Error adding education:', error);
			return fail(500, { message: 'Failed to add education' });
		}
	},

	updateEducation: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const id = formData.get('id');
		const institution = formData.get('institution');
		const degree = formData.get('degree');
		const field = formData.get('field');
		const startDate = formData.get('startDate');
		const endDate = formData.get('endDate');
		const gpa = formData.get('gpa');
		const description = formData.get('description');

		if (!id || typeof id !== 'string') {
			return fail(400, { message: 'Education ID is required' });
		}

		if (!institution || typeof institution !== 'string' || institution.trim().length === 0) {
			return fail(400, { message: 'Institution is required' });
		}

		if (!degree || typeof degree !== 'string' || degree.trim().length === 0) {
			return fail(400, { message: 'Degree is required' });
		}

		if (!startDate || typeof startDate !== 'string' || startDate.trim().length === 0) {
			return fail(400, { message: 'Start date is required' });
		}

		try {
			await db
				.update(table.education)
				.set({
					institution: institution.trim(),
					degree: degree.trim(),
					field: field && typeof field === 'string' ? field.trim() || null : null,
					startDate: startDate.trim(),
					endDate: endDate && typeof endDate === 'string' ? endDate.trim() || null : null,
					gpa: gpa && typeof gpa === 'string' ? gpa.trim() || null : null,
					description: description && typeof description === 'string' ? description.trim() || null : null
				})
				.where(eq(table.education.id, id));

			return { success: true, message: 'Education updated successfully' };
		} catch (error) {
			console.error('Error updating education:', error);
			return fail(500, { message: 'Failed to update education' });
		}
	},

	deleteEducation: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const id = formData.get('id');

		if (!id || typeof id !== 'string') {
			return fail(400, { message: 'Education ID is required' });
		}

		try {
			await db.delete(table.education).where(eq(table.education.id, id));
			return { success: true, message: 'Education deleted successfully' };
		} catch (error) {
			console.error('Error deleting education:', error);
			return fail(500, { message: 'Failed to delete education' });
		}
	},

	addSkill: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const name = formData.get('name');
		const category = formData.get('category');
		const level = formData.get('level');

		if (!name || typeof name !== 'string' || name.trim().length === 0) {
			return fail(400, { message: 'Skill name is required' });
		}

		if (!category || typeof category !== 'string' || category.trim().length === 0) {
			return fail(400, { message: 'Category is required' });
		}

		try {
			const resumeId = await getOrCreateResumeId();
			
			// Get the highest order number
			const skills = await db
				.select()
				.from(table.skill)
				.where(eq(table.skill.resumeId, resumeId));

			const maxOrder = skills.length > 0 ? Math.max(...skills.map(s => s.order)) : -1;

			await db.insert(table.skill).values({
				id: generateId(),
				resumeId,
				name: name.trim(),
				category: category.trim(),
				level: level && typeof level === 'string' ? level.trim() || null : null,
				order: maxOrder + 1
			});

			return { success: true, message: 'Skill added successfully' };
		} catch (error) {
			console.error('Error adding skill:', error);
			return fail(500, { message: 'Failed to add skill' });
		}
	},

	updateSkill: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const id = formData.get('id');
		const name = formData.get('name');
		const category = formData.get('category');
		const level = formData.get('level');

		if (!id || typeof id !== 'string') {
			return fail(400, { message: 'Skill ID is required' });
		}

		if (!name || typeof name !== 'string' || name.trim().length === 0) {
			return fail(400, { message: 'Skill name is required' });
		}

		if (!category || typeof category !== 'string' || category.trim().length === 0) {
			return fail(400, { message: 'Category is required' });
		}

		try {
			await db
				.update(table.skill)
				.set({
					name: name.trim(),
					category: category.trim(),
					level: level && typeof level === 'string' ? level.trim() || null : null
				})
				.where(eq(table.skill.id, id));

			return { success: true, message: 'Skill updated successfully' };
		} catch (error) {
			console.error('Error updating skill:', error);
			return fail(500, { message: 'Failed to update skill' });
		}
	},

	deleteSkill: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const id = formData.get('id');

		if (!id || typeof id !== 'string') {
			return fail(400, { message: 'Skill ID is required' });
		}

		try {
			await db.delete(table.skill).where(eq(table.skill.id, id));
			return { success: true, message: 'Skill deleted successfully' };
		} catch (error) {
			console.error('Error deleting skill:', error);
			return fail(500, { message: 'Failed to delete skill' });
		}
	},

	addSocialLink: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const platform = formData.get('platform');
		const url = formData.get('url');

		if (!platform || typeof platform !== 'string' || platform.trim().length === 0) {
			return fail(400, { message: 'Platform is required' });
		}

		if (!url || typeof url !== 'string' || url.trim().length === 0) {
			return fail(400, { message: 'URL is required' });
		}

		// Basic URL validation
		try {
			new URL(url.trim());
		} catch {
			return fail(400, { message: 'Please enter a valid URL' });
		}

		try {
			const resumeId = await getOrCreateResumeId();
			
			// Get the highest order number
			const socialLinks = await db
				.select()
				.from(table.socialLink)
				.where(eq(table.socialLink.resumeId, resumeId));

			const maxOrder = socialLinks.length > 0 ? Math.max(...socialLinks.map(s => s.order)) : -1;

			await db.insert(table.socialLink).values({
				id: generateId(),
				resumeId,
				platform: platform.trim(),
				url: url.trim(),
				order: maxOrder + 1
			});

			return { success: true, message: 'Social link added successfully' };
		} catch (error) {
			console.error('Error adding social link:', error);
			return fail(500, { message: 'Failed to add social link' });
		}
	},

	updateSocialLink: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const id = formData.get('id');
		const platform = formData.get('platform');
		const url = formData.get('url');

		if (!id || typeof id !== 'string') {
			return fail(400, { message: 'Social link ID is required' });
		}

		if (!platform || typeof platform !== 'string' || platform.trim().length === 0) {
			return fail(400, { message: 'Platform is required' });
		}

		if (!url || typeof url !== 'string' || url.trim().length === 0) {
			return fail(400, { message: 'URL is required' });
		}

		// Basic URL validation
		try {
			new URL(url.trim());
		} catch {
			return fail(400, { message: 'Please enter a valid URL' });
		}

		try {
			await db
				.update(table.socialLink)
				.set({
					platform: platform.trim(),
					url: url.trim()
				})
				.where(eq(table.socialLink.id, id));

			return { success: true, message: 'Social link updated successfully' };
		} catch (error) {
			console.error('Error updating social link:', error);
			return fail(500, { message: 'Failed to update social link' });
		}
	},

	deleteSocialLink: async (event) => {
		requireLogin();

		const formData = await event.request.formData();
		const id = formData.get('id');

		if (!id || typeof id !== 'string') {
			return fail(400, { message: 'Social link ID is required' });
		}

		try {
			await db.delete(table.socialLink).where(eq(table.socialLink.id, id));
			return { success: true, message: 'Social link deleted successfully' };
		} catch (error) {
			console.error('Error deleting social link:', error);
			return fail(500, { message: 'Failed to delete social link' });
		}
	}
};

async function getOrCreateResumeId(): Promise<string> {
	// Check if resume exists
	const [existingResume] = await db
		.select()
		.from(table.resume)
		.limit(1);

	if (existingResume) {
		return existingResume.id;
	}

	// Create a basic resume entry
	const resumeId = generateId();
	await db.insert(table.resume).values({
		id: resumeId,
		fullName: 'Your Name',
		title: 'Your Title',
		email: 'your.email@example.com'
	});

	return resumeId;
}

function generateId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

function requireLogin() {
	const { locals } = getRequestEvent();

	if (!locals.user) {
		return redirect(302, '/admin/login');
	}

	return locals.user;
}