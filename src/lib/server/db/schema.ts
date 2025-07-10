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