import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { env } from '$env/dynamic/private';

if (!env.R2_ACCOUNT_ID) throw new Error('R2_ACCOUNT_ID is not set');
if (!env.R2_ACCESS_KEY_ID) throw new Error('R2_ACCESS_KEY_ID is not set');
if (!env.R2_SECRET_ACCESS_KEY) throw new Error('R2_SECRET_ACCESS_KEY is not set');
if (!env.R2_BUCKET_NAME) throw new Error('R2_BUCKET_NAME is not set');

const r2Client = new S3Client({
	region: 'auto',
	endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: env.R2_ACCESS_KEY_ID,
		secretAccessKey: env.R2_SECRET_ACCESS_KEY
	}
});

export async function uploadToR2(file: File, key: string): Promise<string> {
	const buffer = Buffer.from(await file.arrayBuffer());
	
	const command = new PutObjectCommand({
		Bucket: env.R2_BUCKET_NAME,
		Key: key,
		Body: buffer,
		ContentType: file.type,
		CacheControl: 'public, max-age=31536000' // 1 year cache
	});

	await r2Client.send(command);
	
	// Return the public URL
	return `https://${env.R2_BUCKET_NAME}.${env.R2_ACCOUNT_ID}.r2.dev/${key}`;
}

export async function deleteFromR2(key: string): Promise<void> {
	const command = new DeleteObjectCommand({
		Bucket: env.R2_BUCKET_NAME,
		Key: key
	});

	await r2Client.send(command);
}

export function getR2KeyFromUrl(url: string): string | null {
	try {
		const urlObj = new URL(url);
		const pathParts = urlObj.pathname.split('/');
		return pathParts.slice(1).join('/'); // Remove the leading slash
	} catch {
		return null;
	}
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
	const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
	const maxSize = 5 * 1024 * 1024; // 5MB

	if (!allowedTypes.includes(file.type)) {
		return { valid: false, error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' };
	}

	if (file.size > maxSize) {
		return { valid: false, error: 'File size too large. Maximum size is 5MB.' };
	}

	return { valid: true };
}