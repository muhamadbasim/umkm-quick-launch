import { Env, PublishRequest, PublishResponse } from './types';
import { analyzeImage } from './services/gemini';
import { createGitHubRepo, pushToGitHub } from './services/github';
import { deployToPages } from './services/cloudflare';
import { generateLandingPage } from './services/templateGenerator';

// CORS headers for frontend access
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle CORS preflight
function handleOptions(): Response {
    return new Response(null, { headers: corsHeaders });
}

// JSON response helper
function jsonResponse(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
        },
    });
}

// Error response helper
function errorResponse(message: string, status = 500): Response {
    return jsonResponse({ error: message, success: false }, status);
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);
        const path = url.pathname;

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return handleOptions();
        }

        try {
            // Health check endpoint
            if (path === '/api/health') {
                return jsonResponse({
                    status: 'ok',
                    environment: env.ENVIRONMENT,
                    timestamp: new Date().toISOString()
                });
            }

            // AI Image Analysis endpoint
            if (path === '/api/analyze-image' && request.method === 'POST') {
                const body = await request.json() as { image: string; language?: 'en' | 'id' };

                if (!body.image) {
                    return errorResponse('Missing image data', 400);
                }

                const result = await analyzeImage(body.image, body.language || 'en', env);
                return jsonResponse(result);
            }

            // Publish landing page endpoint
            if (path === '/api/publish' && request.method === 'POST') {
                const body = await request.json() as PublishRequest;

                if (!body.businessName || !body.headline || !body.story) {
                    return errorResponse('Missing required fields', 400);
                }

                // Step 1: Generate HTML content
                const htmlContent = generateLandingPage(body);

                // Step 2: Create GitHub repository
                const repoName = body.businessName
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, '-')
                    .replace(/-+/g, '-')
                    .substring(0, 50);

                const repoResult = await createGitHubRepo(repoName, env);
                if (!repoResult.success) {
                    return errorResponse(repoResult.error || 'Failed to create repository', 500);
                }

                // Step 3: Push files to repository
                const pushResult = await pushToGitHub(repoName, htmlContent, env);
                if (!pushResult.success) {
                    return errorResponse(pushResult.error || 'Failed to push files', 500);
                }

                // Step 4: Deploy to Cloudflare Pages (or use GitHub Pages)
                const deployResult = await deployToPages(repoName, env);

                const response: PublishResponse = {
                    success: true,
                    url: deployResult.url || `https://${repoName}.pages.dev`,
                    repoUrl: repoResult.repoUrl,
                };

                return jsonResponse(response);
            }

            // 404 for unknown routes
            return errorResponse('Not found', 404);

        } catch (error) {
            console.error('Worker error:', error);
            return errorResponse(
                error instanceof Error ? error.message : 'Internal server error',
                500
            );
        }
    },
};
