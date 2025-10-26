/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event);
	
	// Security headers configuration
	const securityHeaders = {
		// Content Security Policy
		'Content-Security-Policy': `
			default-src 'self';
			script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://unpkg.com;
			style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
			font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
			img-src 'self' data: https: https://media.amga.co.uk;
			connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://wordpress.codemash.dev https://unpkg.com https://media.amga.co.uk;
			frame-src 'none';
			object-src 'none';
			base-uri 'self';
			form-action 'self';
		`.replace(/\s+/g, ' ').trim(),
		
		// Strict Transport Security
		'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
		
		// X-Content-Type-Options
		'X-Content-Type-Options': 'nosniff',
		
		// X-Frame-Options
		'X-Frame-Options': 'SAMEORIGIN',
		
		// X-XSS-Protection
		'X-XSS-Protection': '1; mode=block',
		
		// Referrer Policy
		'Referrer-Policy': 'strict-origin-when-cross-origin',
		
		// Permissions Policy
		'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
		
		// Additional security headers
		'X-Permitted-Cross-Domain-Policies': 'none',
		'X-DNS-Prefetch-Control': 'off'
	};
	
	// Add security headers to the response
	for (const [header, value] of Object.entries(securityHeaders)) {
		response.headers.set(header, value);
	}
	
	return response;
}
