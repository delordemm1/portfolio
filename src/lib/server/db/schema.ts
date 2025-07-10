import { sqliteTable, integer, text, sql } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const project = sqliteTable('project', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	image: text('image'),
	shortDescription: text('short_description'),
	optionalLink: text('optional_link'),
	fullDescription: text('full_description'),
	extraDetails: text('extra_details'),
	status: text('status').notNull().default('draft'), // 'draft' or 'published'
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Project = typeof project.$inferSelect;

export const blogPost = sqliteTable('blog_post', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	manualSummary: text('manual_summary'),
	aiSummary: text('ai_summary'),
	featuredImage: text('featured_image'),
	status: text('status').notNull().default('draft'), // 'draft' or 'published'
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const blogBlock = sqliteTable('blog_block', {
	id: text('id').primaryKey(),
	postId: text('post_id').notNull().references(() => blogPost.id, { onDelete: 'cascade' }),
	type: text('type').notNull(), // 'text', 'image', 'youtube', 'link'
	content: text('content').notNull(), // JSON string containing block-specific data
	order: integer('order').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export type BlogPost = typeof blogPost.$inferSelect;
export type BlogBlock = typeof blogBlock.$inferSelect;

// Resume tables
export const resume = sqliteTable('resume', {
	id: text('id').primaryKey(),
	fullName: text('full_name').notNull(),
	title: text('title').notNull(),
	email: text('email').notNull(),
	phone: text('phone'),
	location: text('location'),
	website: text('website'),
	summary: text('summary'),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const experience = sqliteTable('experience', {
	id: text('id').primaryKey(),
	resumeId: text('resume_id').notNull().references(() => resume.id, { onDelete: 'cascade' }),
	company: text('company').notNull(),
	position: text('position').notNull(),
	startDate: text('start_date').notNull(), // YYYY-MM format
	endDate: text('end_date'), // YYYY-MM format, null for current
	description: text('description'),
	location: text('location'),
	order: integer('order').notNull().default(0),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const education = sqliteTable('education', {
	id: text('id').primaryKey(),
	resumeId: text('resume_id').notNull().references(() => resume.id, { onDelete: 'cascade' }),
	institution: text('institution').notNull(),
	degree: text('degree').notNull(),
	field: text('field'),
	startDate: text('start_date').notNull(), // YYYY-MM format
	endDate: text('end_date'), // YYYY-MM format, null for current
	gpa: text('gpa'),
	description: text('description'),
	order: integer('order').notNull().default(0),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const skill = sqliteTable('skill', {
	id: text('id').primaryKey(),
	resumeId: text('resume_id').notNull().references(() => resume.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	category: text('category').notNull(), // 'technical', 'soft', 'language', etc.
	level: text('level'), // 'beginner', 'intermediate', 'advanced', 'expert'
	order: integer('order').notNull().default(0),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export const socialLink = sqliteTable('social_link', {
	id: text('id').primaryKey(),
	resumeId: text('resume_id').notNull().references(() => resume.id, { onDelete: 'cascade' }),
	platform: text('platform').notNull(), // 'linkedin', 'github', 'twitter', etc.
	url: text('url').notNull(),
	order: integer('order').notNull().default(0),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

export type Resume = typeof resume.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Skill = typeof skill.$inferSelect;
export type SocialLink = typeof socialLink.$inferSelect;