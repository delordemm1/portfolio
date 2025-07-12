import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import PDFDocument from 'pdfkit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		// Get the first resume (assuming single user)
		const [resume] = await db
			.select()
			.from(table.resume)
			.limit(1);

		if (!resume) {
			throw error(404, 'Resume not found');
		}

		// Fetch all related data
		const [experiences, education, skills, socialLinks] = await Promise.all([
			db.select().from(table.experience).where(eq(table.experience.resumeId, resume.id)).orderBy(table.experience.order),
			db.select().from(table.education).where(eq(table.education.resumeId, resume.id)).orderBy(table.education.order),
			db.select().from(table.skill).where(eq(table.skill.resumeId, resume.id)).orderBy(table.skill.order),
			db.select().from(table.socialLink).where(eq(table.socialLink.resumeId, resume.id)).orderBy(table.socialLink.order)
		]);

		// Create PDF document
		const doc = new PDFDocument({
			size: 'A4',
			margins: { top: 50, bottom: 50, left: 50, right: 50 }
		});

		// Set response headers
		const headers = new Headers();
		headers.set('Content-Type', 'application/pdf');
		headers.set('Content-Disposition', `attachment; filename="${resume.fullName.replace(/\s+/g, '_')}_Resume.pdf"`);

		// Create readable stream
		const stream = new ReadableStream({
			start(controller) {
				// Header
				doc.fontSize(24).font('Helvetica-Bold').text(resume.fullName, { align: 'center' });
				doc.fontSize(16).font('Helvetica').text(resume.title, { align: 'center' });
				doc.moveDown(0.5);

				// Contact info
				const contactInfo = [];
				if (resume.email) contactInfo.push(`Email: ${resume.email}`);
				if (resume.phone) contactInfo.push(`Phone: ${resume.phone}`);
				if (resume.location) contactInfo.push(`Location: ${resume.location}`);
				if (resume.website) contactInfo.push(`Website: ${resume.website}`);

				if (contactInfo.length > 0) {
					doc.fontSize(10).text(contactInfo.join(' | '), { align: 'center' });
				}

				// Social links
				if (socialLinks.length > 0) {
					const socialText = socialLinks.map(link => `${link.platform}: ${link.url}`).join(' | ');
					doc.fontSize(10).text(socialText, { align: 'center' });
				}

				doc.moveDown(1);

				// Summary
				if (resume.summary) {
					doc.fontSize(14).font('Helvetica-Bold').text('PROFESSIONAL SUMMARY');
					doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
					doc.moveDown(0.5);
					doc.fontSize(11).font('Helvetica').text(resume.summary, { align: 'justify' });
					doc.moveDown(1);
				}

				// Experience
				if (experiences.length > 0) {
					doc.fontSize(14).font('Helvetica-Bold').text('PROFESSIONAL EXPERIENCE');
					doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
					doc.moveDown(0.5);

					experiences.forEach((exp, index) => {
						if (index > 0) doc.moveDown(0.5);
						
						doc.fontSize(12).font('Helvetica-Bold').text(exp.position);
						doc.fontSize(11).font('Helvetica-Bold').text(exp.company);
						
						const dateRange = `${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`;
						if (exp.location) {
							doc.text(`${exp.location} | ${dateRange}`);
						} else {
							doc.text(dateRange);
						}
						
						if (exp.description) {
							doc.moveDown(0.3);
							doc.fontSize(10).font('Helvetica').text(exp.description, { align: 'justify' });
						}
					});
					doc.moveDown(1);
				}

				// Education
				if (education.length > 0) {
					doc.fontSize(14).font('Helvetica-Bold').text('EDUCATION');
					doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
					doc.moveDown(0.5);

					education.forEach((edu, index) => {
						if (index > 0) doc.moveDown(0.5);
						
						doc.fontSize(12).font('Helvetica-Bold').text(edu.degree);
						if (edu.field) {
							doc.fontSize(11).font('Helvetica').text(edu.field);
						}
						doc.fontSize(11).font('Helvetica-Bold').text(edu.institution);
						
						const dateRange = `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`;
						let additionalInfo = dateRange;
						if (edu.gpa) {
							additionalInfo += ` | GPA: ${edu.gpa}`;
						}
						doc.fontSize(10).font('Helvetica').text(additionalInfo);
						
						if (edu.description) {
							doc.moveDown(0.3);
							doc.fontSize(10).text(edu.description, { align: 'justify' });
						}
					});
					doc.moveDown(1);
				}

				// Skills
				if (skills.length > 0) {
					doc.fontSize(14).font('Helvetica-Bold').text('SKILLS');
					doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
					doc.moveDown(0.5);

					// Group skills by category
					const groupedSkills: Record<string, typeof skills> = {};
					skills.forEach(skill => {
						if (!groupedSkills[skill.category]) {
							groupedSkills[skill.category] = [];
						}
						groupedSkills[skill.category].push(skill);
					});

					Object.entries(groupedSkills).forEach(([category, categorySkills]) => {
						doc.fontSize(11).font('Helvetica-Bold').text(category.replace('_', ' ').toUpperCase() + ':');
						const skillNames = categorySkills.map(skill => {
							let name = skill.name;
							if (skill.level) {
								name += ` (${skill.level})`;
							}
							return name;
						}).join(', ');
						doc.fontSize(10).font('Helvetica').text(skillNames, { indent: 20 });
						doc.moveDown(0.3);
					});
				}

				// Handle data and end events
				doc.on('data', (chunk) => {
					controller.enqueue(new Uint8Array(chunk));
				});

				doc.on('end', () => {
					controller.close();
				});

				doc.on('error', (err) => {
					controller.error(err);
				});

				// Finalize the PDF
				doc.end();
			}
		});

		return new Response(stream, { headers });
	} catch (err) {
		console.error('Error generating PDF:', err);
		throw error(500, 'Failed to generate PDF');
	}
};

function formatDate(dateString: string | null): string {
	if (!dateString) return 'Present';
	const [year, month] = dateString.split('-');
	const date = new Date(parseInt(year), parseInt(month) - 1);
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}