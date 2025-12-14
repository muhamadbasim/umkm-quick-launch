export interface Project {
  id: string;
  businessName: string;
  imageUrl: string; // Base64 or URL
  headline: string;
  story: string;
  phone: string;
  templateId: 'culinary' | 'fashion' | 'service';
  status: 'draft' | 'publishing' | 'published';
  publishedUrl?: string;
  createdAt: number;
}

export interface AIAnalysisResult {
  businessNameSuggestion: string;
  headline: string;
  story: string;
  suggestedTemplate: 'culinary' | 'fashion' | 'service';
}

export type WizardStep = 'upload' | 'analyzing' | 'review' | 'publishing' | 'success';
