# Design Document: UMKM Quick-Launch PWA

## Overview

UMKM Quick-Launch adalah Progressive Web App (PWA) mobile-first yang memungkinkan freelancer digital marketing membuat landing page untuk UMKM dalam waktu kurang dari 10 menit. Sistem ini menggunakan arsitektur headless yang mengabstraksi kompleksitas GitHub dan Cloudflare, dilengkapi dengan AI Vision untuk auto-generate marketing copy dari foto produk.

### Key Design Goals
- **Speed**: Time-to-publish < 10 menit
- **Simplicity**: Zero technical knowledge required
- **Reliability**: 99% publish success rate
- **Offline-First**: Bekerja di area dengan koneksi buruk

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PWA Client                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │Dashboard │  │ Camera/  │  │ Template │  │  Offline Store   │ │
│  │  View    │  │ Gallery  │  │ Preview  │  │   (IndexedDB)    │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend Services                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  API Server  │  │  AI Vision   │  │  Deployment Engine   │   │
│  │  (Next.js)   │  │ (GPT/Gemini) │  │  (GitHub + CF API)   │   │
│  │              │  │              │  │                      │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    External Services                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │   GitHub     │  │  Cloudflare  │  │   AI Vision API      │   │
│  │   (Repos)    │  │   (Pages)    │  │  (GPT-4o/Gemini 2.0) │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack
- **Frontend**: Next.js 14+ (App Router) dengan TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand untuk global state
- **Offline Storage**: IndexedDB via Dexie.js
- **PWA**: next-pwa untuk service worker
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: Multi-provider AI Vision (OpenAI GPT-4o / Google Gemini 2.0 Flash) - configurable
- **Deployment**: Vercel (PWA) + Cloudflare Pages (generated sites)

## Components and Interfaces

### 1. PWA Shell Component

```typescript
interface PWAShellProps {
  children: React.ReactNode;
}

// Handles:
// - Service worker registration
// - Install prompt management
// - Offline detection
// - App shell caching
```

### 2. Dashboard Component

```typescript
interface Project {
  id: string;
  name: string;
  businessName: string;
  thumbnail: string | null;
  status: 'draft' | 'publishing' | 'published' | 'failed';
  liveUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  syncStatus: 'synced' | 'pending' | 'conflict';
}

interface DashboardProps {
  projects: Project[];
  onCreateProject: () => void;
  onSelectProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
}
```

### 3. Photo Capture Component

```typescript
interface PhotoCaptureProps {
  onPhotoCapture: (photo: CompressedImage) => void;
  maxSizeKB?: number; // default: 500
  quality?: number;   // default: 0.8
}

interface CompressedImage {
  blob: Blob;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
}
```

### 4. AI Content Generator Service

```typescript
type AIProvider = 'openai' | 'gemini';

interface AIContentRequest {
  imageBase64: string;
  businessType?: 'culinary' | 'fashion' | 'service';
  language?: 'id' | 'en';
  provider?: AIProvider; // defaults to env config
}

interface AIContentResponse {
  headline: string;
  description: string;
  storytelling: string;
  suggestedTags: string[];
  provider: AIProvider; // which provider was used
}

interface AIContentService {
  generateContent(request: AIContentRequest): Promise<AIContentResponse>;
  getAvailableProviders(): AIProvider[];
}

// Provider configuration (env-based)
// OPENAI_API_KEY - for GPT-4o Vision
// GOOGLE_AI_API_KEY - for Gemini 2.0 Flash
// AI_DEFAULT_PROVIDER - 'openai' | 'gemini'
```

### 5. Template Engine

```typescript
interface Template {
  id: string;
  name: string;
  category: 'culinary' | 'fashion' | 'service';
  previewUrl: string;
  themes: Theme[];
}

interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: string;
}

interface TemplateData {
  businessName: string;
  headline: string;
  description: string;
  storytelling: string;
  photos: string[];
  whatsappNumber: string;
  theme: Theme;
}
```

### 6. Deployment Engine

```typescript
interface DeploymentRequest {
  projectId: string;
  templateId: string;
  templateData: TemplateData;
}

interface DeploymentStatus {
  stage: 'uploading' | 'building' | 'deploying' | 'complete' | 'failed';
  progress: number;
  message: string;
  liveUrl?: string;
  error?: string;
}

interface DeploymentService {
  deploy(request: DeploymentRequest): Promise<string>; // returns deployment ID
  getStatus(deploymentId: string): Promise<DeploymentStatus>;
}
```

### 7. Offline Sync Manager

```typescript
interface SyncManager {
  saveLocal(project: Project): Promise<void>;
  getLocal(id: string): Promise<Project | null>;
  getAllLocal(): Promise<Project[]>;
  syncToServer(): Promise<SyncResult>;
  getOfflineChanges(): Promise<Project[]>;
}

interface SyncResult {
  synced: number;
  failed: number;
  conflicts: Project[];
}
```

## Data Models

### Project Schema

```typescript
interface ProjectSchema {
  id: string;                    // UUID
  userId: string;                // Owner ID
  name: string;                  // Project name
  businessName: string;          // UMKM business name
  
  // Content
  photos: PhotoData[];
  aiContent: AIContentResponse | null;
  editedContent: {
    headline: string;
    description: string;
    storytelling: string;
  } | null;
  
  // Configuration
  templateId: string;
  themeId: string;
  whatsappNumber: string;
  
  // Status
  status: ProjectStatus;
  liveUrl: string | null;
  
  // Timestamps
  createdAt: string;             // ISO date
  updatedAt: string;             // ISO date
  publishedAt: string | null;    // ISO date
  
  // Sync
  localVersion: number;
  serverVersion: number;
  syncStatus: SyncStatus;
}

type ProjectStatus = 'draft' | 'publishing' | 'published' | 'failed';
type SyncStatus = 'synced' | 'pending' | 'conflict';

interface PhotoData {
  id: string;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
}
```

### IndexedDB Schema (Offline Storage)

```typescript
// Dexie.js schema
const db = new Dexie('UMKMQuickLaunch');
db.version(1).stores({
  projects: 'id, userId, status, syncStatus, updatedAt',
  photos: 'id, projectId',
  pendingSync: '++id, projectId, action, timestamp'
});
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the acceptance criteria analysis, the following correctness properties must be validated through property-based testing:

### Property 1: Project List Rendering Completeness
*For any* list of projects, when rendered in the dashboard, each project item SHALL display name, thumbnail (or placeholder), status, and last modified date.
**Validates: Requirements 2.1**

### Property 2: Project Sorting Order
*For any* list of projects with different updatedAt timestamps, the sorted list SHALL have projects ordered by updatedAt in descending order (most recent first).
**Validates: Requirements 2.5**

### Property 3: Image Compression Size Constraint
*For any* input image, the compression function SHALL produce output with size less than or equal to 500KB (512,000 bytes).
**Validates: Requirements 3.3**

### Property 4: AI Response Parsing Completeness
*For any* valid AI Vision API response, the parsed result SHALL contain non-empty headline, description, and storytelling fields.
**Validates: Requirements 4.2**

### Property 5: Template Categorization
*For any* set of templates, when grouped by category, each template SHALL appear in exactly one category group matching its category field.
**Validates: Requirements 5.1**

### Property 6: Project Template Configuration Persistence
*For any* project after template selection, the project object SHALL contain valid templateId and themeId values.
**Validates: Requirements 5.5**

### Property 7: Indonesian Phone Number Validation
*For any* string input, the phone validation function SHALL return true only for strings matching Indonesian phone number format (starting with 08, +62, or 62, followed by 9-12 digits).
**Validates: Requirements 6.2**

### Property 8: WhatsApp Deep Link Generation
*For any* valid Indonesian phone number, the generated WhatsApp link SHALL follow the format `https://wa.me/62XXXXXXXXXX` with country code normalized.
**Validates: Requirements 6.4**

### Property 9: Deployment Status Transition
*For any* successful deployment, the project status SHALL transition to "published" and liveUrl SHALL be non-null.
**Validates: Requirements 7.7**

### Property 10: Offline Data Persistence and Retention
*For any* project change made while offline, the data SHALL be persisted to IndexedDB and retained even if subsequent sync attempts fail.
**Validates: Requirements 8.2, 8.5**

### Property 11: Offline Cache Retrieval
*For any* project that has been cached locally, viewing the project while offline SHALL return the cached project data with all fields intact.
**Validates: Requirements 8.6**

### Property 12: Project Serialization Round-Trip
*For any* valid Project object, serializing to JSON and then deserializing SHALL produce an object equivalent to the original.
**Validates: Requirements 9.4, 9.5**

## Error Handling

### API Error Handling Strategy

```typescript
interface APIError {
  code: string;
  message: string;
  userMessage: string;
  retryable: boolean;
}

const errorHandlers = {
  // AI Vision API Errors
  'AI_RATE_LIMIT': {
    userMessage: 'Terlalu banyak permintaan. Coba lagi dalam beberapa menit.',
    retryable: true,
    retryDelay: 60000
  },
  'AI_INVALID_IMAGE': {
    userMessage: 'Gambar tidak dapat diproses. Coba foto lain.',
    retryable: false
  },
  'AI_SERVICE_UNAVAILABLE': {
    userMessage: 'Layanan AI sedang tidak tersedia. Anda dapat mengisi konten manual.',
    retryable: true,
    fallback: 'manual_input'
  },
  
  // GitHub API Errors
  'GITHUB_AUTH_FAILED': {
    userMessage: 'Gagal terhubung ke layanan. Hubungi support.',
    retryable: false
  },
  'GITHUB_RATE_LIMIT': {
    userMessage: 'Terlalu banyak publish. Coba lagi nanti.',
    retryable: true,
    retryDelay: 300000
  },
  
  // Cloudflare API Errors
  'CF_BUILD_FAILED': {
    userMessage: 'Gagal membangun situs. Coba publish ulang.',
    retryable: true
  },
  'CF_DEPLOY_TIMEOUT': {
    userMessage: 'Proses deploy memakan waktu lama. Cek status nanti.',
    retryable: true
  },
  
  // Network Errors
  'NETWORK_OFFLINE': {
    userMessage: 'Tidak ada koneksi internet. Perubahan disimpan lokal.',
    retryable: true,
    autoRetry: true
  }
};
```

### Offline Error Recovery

```typescript
interface PendingSyncItem {
  id: string;
  projectId: string;
  action: 'create' | 'update' | 'delete';
  data: Partial<Project>;
  timestamp: Date;
  retryCount: number;
  lastError?: string;
}

// Sync queue with exponential backoff
const syncWithRetry = async (item: PendingSyncItem): Promise<boolean> => {
  const maxRetries = 3;
  const baseDelay = 1000;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      await syncToServer(item);
      return true;
    } catch (error) {
      const delay = baseDelay * Math.pow(2, i);
      await sleep(delay);
    }
  }
  return false;
};
```

## Testing Strategy

### Property-Based Testing Framework

**Library**: fast-check (TypeScript property-based testing library)

```typescript
import fc from 'fast-check';
```

### Unit Testing

**Library**: Vitest

Unit tests will cover:
- Individual component rendering
- Utility function behavior
- State management actions
- API response parsing

### Integration Testing

**Library**: Playwright

Integration tests will cover:
- Full user flows (create project → publish)
- Offline/online transitions
- API integration points

### Test Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### Property-Based Test Requirements

1. Each property-based test MUST run a minimum of 100 iterations
2. Each property-based test MUST be tagged with the format: `**Feature: umkm-quick-launch, Property {number}: {property_text}**`
3. Each correctness property MUST be implemented by a SINGLE property-based test
4. Generators MUST be designed to produce valid inputs within the domain constraints

### Example Property Test Structure

```typescript
describe('Project Serialization', () => {
  /**
   * **Feature: umkm-quick-launch, Property 12: Project Serialization Round-Trip**
   * **Validates: Requirements 9.4, 9.5**
   */
  it('should round-trip serialize/deserialize projects', () => {
    fc.assert(
      fc.property(projectArbitrary, (project) => {
        const serialized = JSON.stringify(project);
        const deserialized = JSON.parse(serialized);
        return deepEqual(project, deserialized);
      }),
      { numRuns: 100 }
    );
  });
});
```

### Test File Organization

```
src/
├── lib/
│   ├── compression.ts
│   ├── compression.test.ts          # Unit tests
│   ├── compression.property.test.ts # Property tests
│   ├── validation.ts
│   ├── validation.test.ts
│   └── validation.property.test.ts
├── services/
│   ├── ai-content.ts
│   ├── ai-content.test.ts
│   ├── deployment.ts
│   └── deployment.test.ts
├── stores/
│   ├── project-store.ts
│   ├── project-store.test.ts
│   └── project-store.property.test.ts
└── test/
    ├── setup.ts
    ├── generators/                   # fast-check generators
    │   ├── project.generator.ts
    │   ├── phone.generator.ts
    │   └── image.generator.ts
    └── e2e/
        └── publish-flow.spec.ts
```
