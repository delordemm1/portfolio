import { sql } from 'drizzle-orm';
import {
    pgTable,
    uuid,
    text,
    integer,
    timestamp,
    pgEnum,
    jsonb,
    date
} from 'drizzle-orm/pg-core';
// PLATFORM VALUES

const socialPlatforms = ['linkedin', 'github', 'twitter', 'portfolio', 'instagram', 'facebook', 'youtube', 'website'] as const;
const skillCategories = ['technical', 'soft', 'language', 'frameworks', 'tools', 'other'] as const;
const skillLevels = ['beginner', 'intermediate', 'advanced', 'expert'] as const;

// --- ENUMS ---
// Enums provide type-safety for columns with a fixed set of values.

export const statusEnum = pgEnum('status', ['draft', 'published']);
export const blockTypeEnum = pgEnum('block_type', ['text', 'image', 'youtube', 'link']);
export const skillCategoryEnum = pgEnum('skill_category', skillCategories);
export const skillLevelEnum = pgEnum('skill_level', skillLevels);
export const socialPlatformEnum = pgEnum('social_platform', socialPlatforms);


// --- AUTH ---

export const user = pgTable('user', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    age: integer('age'),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
    id: text('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

// --- CONTENT ---

export const project = pgTable('project', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: text('name').notNull(),
    image: text('image'),
    shortDescription: text('short_description'),
    optionalLink: text('optional_link'),
    fullDescription: text('full_description'),
    extraDetails: text('extra_details'),
    status: statusEnum('status').notNull().default('draft'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const blogPost = pgTable('blog_post', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    manualSummary: text('manual_summary'),
    aiSummary: text('ai_summary'),
    featuredImage: text('featured_image'),
    status: statusEnum('status').notNull().default('draft'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const blogBlock = pgTable('blog_block', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    postId: uuid('post_id').notNull().references(() => blogPost.id, { onDelete: 'cascade' }),
    type: blockTypeEnum('type').notNull(),
    content: jsonb('content').notNull(),
    order: integer('order').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

// --- RESUME ---

export const resume = pgTable('resume', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    fullName: text('full_name').notNull(),
    title: text('title').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    location: text('location'),
    website: text('website'),
    summary: text('summary'),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const experience = pgTable('experience', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    resumeId: uuid('resume_id').notNull().references(() => resume.id, { onDelete: 'cascade' }),
    company: text('company').notNull(),
    position: text('position').notNull(),
    startDate: date('start_date', { mode: 'string' }).notNull(),
    endDate: date('end_date', { mode: 'string' }),
    description: text('description'),
    location: text('location'),
    order: integer('order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const education = pgTable('education', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    resumeId: uuid('resume_id').notNull().references(() => resume.id, { onDelete: 'cascade' }),
    institution: text('institution').notNull(),
    degree: text('degree').notNull(),
    field: text('field'),
    startDate: date('start_date', { mode: 'string' }).notNull(),
    endDate: date('end_date', { mode: 'string' }),
    gpa: text('gpa'),
    description: text('description'),
    order: integer('order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const skill = pgTable('skill', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    resumeId: uuid('resume_id').notNull().references(() => resume.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    category: skillCategoryEnum('category').notNull(),
    level: skillLevelEnum('level'),
    order: integer('order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const socialLink = pgTable('social_link', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    resumeId: uuid('resume_id').notNull().references(() => resume.id, { onDelete: 'cascade' }),
    platform: socialPlatformEnum('platform').notNull(),
    url: text('url').notNull(),
    order: integer('order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

// --- SUBMISSIONS ---

export const contactSubmission = pgTable('contact_submission', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: text('name').notNull(),
    email: text('email').notNull(),
    company: text('company'),
    subject: text('subject').notNull(),
    message: text('message').notNull(),
    budget: text('budget'),
    timeline: text('timeline'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const feedbackSubmission = pgTable('feedback_submission', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    clientName: text('client_name').notNull(),
    email: text('email').notNull(),
    company: text('company'),
    projectName: text('project_name').notNull(),
    rating: integer('rating').notNull(),
    feedback: text('feedback').notNull(),
    improvements: text('improvements'),
    recommend: text('recommend'),
    testimonialPermission: text('testimonial_permission'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

// --- TYPES ---
// Drizzle's inferred types for safe querying

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Project = typeof project.$inferSelect;
export type BlogPost = typeof blogPost.$inferSelect;
export type BlogBlock = typeof blogBlock.$inferSelect;
export type Resume = typeof resume.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Skill = typeof skill.$inferSelect;
export type SocialLink = typeof socialLink.$inferSelect;
export type ContactSubmission = typeof contactSubmission.$inferSelect;
export type FeedbackSubmission = typeof feedbackSubmission.$inferSelect;
export type SocialPlatform = typeof socialPlatforms[number];
export type SkillCategory = typeof skillCategories[number];
export type SkillLevel = typeof skillLevels[number];
