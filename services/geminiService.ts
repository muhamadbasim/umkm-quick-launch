import { AIAnalysisResult } from "../types";

// Backend API URL - uses relative path in production, absolute in development
const API_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:8787'
  : '';

/**
 * Analyze an image using the backend API (which securely calls Gemini)
 * API key is now stored on the server, not exposed to client
 */
export const analyzeImageForLandingPage = async (
  base64Image: string,
  language: 'en' | 'id' = 'en'
): Promise<AIAnalysisResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
        language,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const result = await response.json();
    return result as AIAnalysisResult;

  } catch (error) {
    console.error("Image Analysis Error:", error);

    // Fallback data for graceful degradation
    const isId = language === 'id';
    return {
      businessNameSuggestion: "Luxe Local",
      headline: isId ? "Keunggulan dalam Setiap Detail" : "Excellence in Every Detail",
      story: isId
        ? "Dibuat dengan kualitas tanpa kompromi, produk kami mendefinisikan ulang standar kemewahan lokal untuk pelanggan yang cerdas."
        : "Crafted with uncompromising quality, our products redefine local luxury standards for the discerning customer.",
      suggestedTemplate: "service",
    };
  }
};

/**
 * Publish a landing page via the backend API
 * Handles GitHub repo creation and deployment
 */
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

export const publishLandingPage = async (data: PublishRequest): Promise<PublishResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || `Publish failed: ${response.status}`,
      };
    }

    return result as PublishResponse;

  } catch (error) {
    console.error("Publish Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown publish error',
    };
  }
};