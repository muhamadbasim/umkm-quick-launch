import { Env } from '../types';

interface DeployResult {
    success: boolean;
    url?: string;
    error?: string;
}

/**
 * Deploy a project to Cloudflare Pages
 * Note: This is a placeholder for Cloudflare Pages API integration
 * For now, we rely on GitHub Pages which is simpler to set up
 */
export async function deployToPages(
    projectName: string,
    env: Env
): Promise<DeployResult> {
    try {
        // For MVP, we use GitHub Pages instead of Cloudflare Pages
        // This simplifies the deployment process as GitHub handles it automatically

        // Get the GitHub username to construct the Pages URL
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${env.GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'User-Agent': 'LocalBrands-Worker',
            },
        });

        if (!userResponse.ok) {
            return {
                success: false,
                error: 'Failed to get user info for deployment URL',
            };
        }

        const userData = await userResponse.json() as { login: string };

        // GitHub Pages URL format: https://<username>.github.io/<repo-name>/
        const pagesUrl = `https://${userData.login}.github.io/${projectName}/`;

        return {
            success: true,
            url: pagesUrl,
        };

    } catch (error) {
        console.error('Deploy error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown deployment error',
        };
    }
}

/**
 * Future: Full Cloudflare Pages API integration
 * This would allow direct deployment without GitHub dependency
 */
export async function deployToCloudflarePages(
    projectName: string,
    htmlContent: string,
    env: Env
): Promise<DeployResult> {
    // Cloudflare Pages Direct Upload API
    // Reference: https://developers.cloudflare.com/pages/platform/direct-upload/

    // This requires:
    // 1. Creating a Pages project
    // 2. Uploading files directly via API
    // 3. Creating a deployment

    // For MVP, we skip this and use GitHub Pages
    // This can be implemented in Phase 2 if needed

    return {
        success: false,
        error: 'Cloudflare Pages direct upload not yet implemented',
    };
}
