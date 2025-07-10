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