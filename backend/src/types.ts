// Type definitions for Cloudflare Worker environment
export interface Env {
    GEMINI_API_KEY: string;
    GITHUB_TOKEN: string;
    CLOUDFLARE_API_TOKEN: string;
    ENVIRONMENT: string;
}

export interface AIAnalysisResult {
    businessNameSuggestion: string;
    headline: string;
    story: string;
    suggestedTemplate: 'culinary' | 'fashion' | 'service';
}

export interface PublishRequest {
    businessName: string;
    headline: string;
    story: string;
    phone: string;
    imageUrl: string;
    templateId: 'culinary' | 'fashion' | 'service';
}

export interface PublishResponse {
    success: boolean;
    url?: string;
    error?: string;
    repoUrl?: string;
}
