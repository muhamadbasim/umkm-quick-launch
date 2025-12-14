import { Env, AIAnalysisResult } from '../types';

/**
 * Analyze an image using Gemini AI Vision
 * This function proxies requests to Gemini, keeping the API key secure on the server
 */
export async function analyzeImage(
    base64Image: string,
    language: 'en' | 'id' = 'en',
    env: Env
): Promise<AIAnalysisResult> {
    // Clean the base64 string if it contains the data URL prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const langInstruction = language === 'id' ? 'Bahasa Indonesia' : 'English';

    const prompt = `
    You are an expert brand strategist and copywriter for high-end local brands.
    Analyze this image of a product or service.
    Create compelling, sophisticated copy for a modern landing page.
    
    Return a JSON object with:
    1. businessNameSuggestion: A modern, premium name for the business (if not obvious).
    2. headline: A sophisticated, punchy hook (max 8 words) in ${langInstruction}.
    3. story: A 2-sentence emotional brand story (${langInstruction}) that elevates the perceived value.
    4. suggestedTemplate: One of ["culinary", "fashion", "service"] based on the image content.
  `;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    inlineData: {
                                        mimeType: 'image/jpeg',
                                        data: cleanBase64,
                                    },
                                },
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        responseMimeType: 'application/json',
                        responseSchema: {
                            type: 'OBJECT',
                            properties: {
                                businessNameSuggestion: { type: 'STRING' },
                                headline: { type: 'STRING' },
                                story: { type: 'STRING' },
                                suggestedTemplate: {
                                    type: 'STRING',
                                    enum: ['culinary', 'fashion', 'service']
                                },
                            },
                            required: ['businessNameSuggestion', 'headline', 'story', 'suggestedTemplate'],
                        },
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API error:', errorText);
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json() as {
            candidates?: Array<{
                content?: {
                    parts?: Array<{ text?: string }>;
                };
            }>;
        };

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error('No response text from Gemini');
        }

        return JSON.parse(text) as AIAnalysisResult;

    } catch (error) {
        console.error('Gemini Analysis Error:', error);

        // Fallback data for graceful degradation
        const isId = language === 'id';
        return {
            businessNameSuggestion: 'Luxe Local',
            headline: isId ? 'Keunggulan dalam Setiap Detail' : 'Excellence in Every Detail',
            story: isId
                ? 'Dibuat dengan kualitas tanpa kompromi, produk kami mendefinisikan ulang standar kemewahan lokal untuk pelanggan yang cerdas.'
                : 'Crafted with uncompromising quality, our products redefine local luxury standards for the discerning customer.',
            suggestedTemplate: 'service',
        };
    }
}
