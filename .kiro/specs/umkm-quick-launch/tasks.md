# Implementation Plan

## References
- Requirements: #[[file:requirements.md]]
- Design: #[[file:design.md]]

- [x] 1. Project Setup & Core Infrastructure


  - [x] 1.1 Initialize Next.js 14+ project with TypeScript, Tailwind CSS, and App Router


    - Configure `next.config.js` for PWA support
    - Set up `tailwind.config.ts` with custom theme
    - Install and configure shadcn/ui
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 1.2 Set up PWA configuration with next-pwa
    - Configure service worker for offline caching
    - Create `manifest.json` with app metadata
    - Implement install prompt component

    - _Requirements: 1.1, 1.2_
  - [x] 1.3 Set up Zustand store for global state management


    - Create project store with CRUD operations

    - Create UI store for app-wide state (loading, errors)
    - _Requirements: 2.1, 2.2_
  - [x] 1.4 Set up IndexedDB with Dexie.js for offline storage

    - Define database schema for projects, photos, pendingSync
    - Create database initialization and migration logic



    - _Requirements: 8.1, 8.2, 9.1_
  - [ ] 1.5 Write property test for Project Serialization Round-Trip
    - **Property 12: Project Serialization Round-Trip**
    - **Validates: Requirements 9.4, 9.5**



  - [x] 1.6 Set up Vitest and fast-check for testing


    - Configure vitest.config.ts
    - Create test setup file


    - Create base generators for property tests
    - _Requirements: Testing Strategy_


- [x] 2. Data Models & Validation

  - [x] 2.1 Implement Project data model and types


    - Create TypeScript interfaces for Project, PhotoData, ProjectStatus
    - Implement project factory functions

    - _Requirements: 2.1, 9.4_
  - [x] 2.2 Implement Indonesian phone number validation

    - Create validation function for 08, +62, 62 formats
    - Handle edge cases (whitespace, special characters)
    - _Requirements: 6.2, 6.3_

  - [x] 2.3 Write property test for Indonesian Phone Number Validation


    - **Property 7: Indonesian Phone Number Validation**
    - **Validates: Requirements 6.2**
  - [x] 2.4 Implement WhatsApp deep link generator


    - Normalize phone numbers to international format
    - Generate wa.me links
    - _Requirements: 6.4_
  - [x] 2.5 Write property test for WhatsApp Deep Link Generation

    - **Property 8: WhatsApp Deep Link Generation**
    - **Validates: Requirements 6.4**
  - [x] 2.6 Write unit tests for data models and validation


    - Test project creation and updates
    - Test phone validation edge cases
    - _Requirements: 2.1, 6.2, 6.3, 6.4_

- [x] 3. Checkpoint - Ensure all tests pass


  - Ensure all tests pass, ask the user if questions arise.

- [-] 4. Image Handling & Compression


  - [x] 4.1 Implement image compression utility

    - Use canvas API for client-side compression
    - Target max 500KB with quality preservation
    - Return CompressedImage with metadata
    - _Requirements: 3.3_
  - [x] 4.2 Write property test for Image Compression Size Constraint

    - **Property 3: Image Compression Size Constraint**
    - **Validates: Requirements 3.3**

  - [x] 4.3 Implement Photo Capture component


    - Camera capture using MediaDevices API
    - Gallery picker using file input
    - Preview display after capture
    - _Requirements: 3.1, 3.2, 3.4, 3.5_

  - [x] 4.4 Write unit tests for image compression


    - Test compression with various image sizes
    - Test error handling for invalid images
    - _Requirements: 3.3, 3.5_

- [-] 5. AI Content Generation Service


  - [x] 5.1 Implement AI provider abstraction layer

    - Create AIProvider interface
    - Implement provider factory pattern
    - _Requirements: 4.1_

  - [x] 5.2 Implement OpenAI GPT-4o Vision provider


    - Create API route for OpenAI integration
    - Handle image encoding and prompt construction
    - Parse response into AIContentResponse
    - _Requirements: 4.1, 4.2_

  - [x] 5.3 Implement Google Gemini Vision provider

    - Create API route for Gemini integration
    - Handle image encoding and prompt construction
    - Parse response into AIContentResponse
    - _Requirements: 4.1, 4.2_

  - [x] 5.4 Write property test for AI Response Parsing Completeness


    - **Property 4: AI Response Parsing Completeness**

    - **Validates: Requirements 4.2**
  - [x] 5.5 Implement AI Content Generator UI component


    - Loading state with progress indicator
    - Error handling with manual input fallback
    - Editable content fields
    - _Requirements: 4.3, 4.4, 4.5_

  - [x] 5.6 Write unit tests for AI service


    - Test provider selection logic
    - Test response parsing
    - Test error handling
    - _Requirements: 4.1, 4.2, 4.4_

- [x] 6. Checkpoint - Ensure all tests pass


  - Ensure all tests pass, ask the user if questions arise.



- [x] 7. Template System

  - [x] 7.1 Create template data structure and registry


    - Define Template and Theme interfaces
    - Create template registry with categories (Culinary, Fashion, Service)



    - _Requirements: 5.1_
  - [x] 7.2 Write property test for Template Categorization


    - **Property 5: Template Categorization**
    - **Validates: Requirements 5.1**


  - [ ] 7.3 Implement Template Selection component
    - Display templates grouped by category
    - Template preview with sample content



    - _Requirements: 5.1, 5.2_


  - [x] 7.4 Implement Theme Selection component


    - Display 3-5 color theme options per template

    - Real-time preview update on selection
    - _Requirements: 5.3, 5.4_
  - [ ] 7.5 Implement template data persistence in project
    - Store templateId and themeId with project
    - _Requirements: 5.5_
  - [ ] 7.6 Write property test for Project Template Configuration Persistence
    - **Property 6: Project Template Configuration Persistence**
    - **Validates: Requirements 5.5**
  - [x] 7.7 Write unit tests for template system


    - Test template registry
    - Test theme application


    - _Requirements: 5.1, 5.3, 5.5_

- [-] 8. Dashboard & Project Management

  - [x] 8.1 Implement Dashboard page component



    - Project list with cards showing name, thumbnail, status, date
    - Create new project button
    - _Requirements: 2.1, 2.2_



  - [ ] 8.2 Write property test for Project List Rendering Completeness
    - **Property 1: Project List Rendering Completeness**



    - **Validates: Requirements 2.1**
  - [ ] 8.3 Implement project sorting by last modified date
    - Sort projects descending by updatedAt

    - _Requirements: 2.5_
  - [x] 8.4 Write property test for Project Sorting Order

    - **Property 2: Project Sorting Order**


    - **Validates: Requirements 2.5**
  - [x] 8.5 Implement project item actions (swipe to delete/archive)


    - Swipe gesture handling
    - Delete and archive action buttons
    - _Requirements: 2.3, 2.4_



  - [ ] 8.6 Write unit tests for dashboard
    - Test project list rendering
    - Test sorting behavior


    - Test action handlers
    - _Requirements: 2.1, 2.3, 2.4, 2.5_


- [x] 9. Checkpoint - Ensure all tests pass



  - Ensure all tests pass, ask the user if questions arise.

- [-] 10. Offline Storage & Sync

  - [x] 10.1 Implement local storage service with Dexie.js

    - CRUD operations for projects in IndexedDB
    - Auto-save on project changes
    - _Requirements: 8.2, 9.1_
  - [ ] 10.2 Write property test for Offline Data Persistence and Retention
    - **Property 10: Offline Data Persistence and Retention**
    - **Validates: Requirements 8.2, 8.5**

  - [ ] 10.3 Implement offline detection hook
    - Monitor navigator.onLine status
    - Provide offline indicator in UI

    - _Requirements: 8.1_
  - [ ] 10.4 Implement sync manager for online/offline transitions
    - Queue pending changes when offline
    - Auto-sync when connection restored
    - Handle sync conflicts

    - _Requirements: 8.3, 8.4, 8.5_
  - [ ] 10.5 Implement cached project retrieval for offline viewing
    - Load from IndexedDB when offline
    - Display cached images
    - _Requirements: 8.6_
  - [ ] 10.6 Write property test for Offline Cache Retrieval
    - **Property 11: Offline Cache Retrieval**
    - **Validates: Requirements 8.6**
  - [ ] 10.7 Write unit tests for offline storage
    - Test IndexedDB operations
    - Test sync queue behavior
    - Test offline detection
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.6_


- [ ] 11. Deployment Engine
  - [x] 11.1 Implement GitHub API integration

    - Create/update repository for project
    - Commit generated site content
    - Handle authentication with service account
    - _Requirements: 7.1_

  - [ ] 11.2 Implement Cloudflare Pages API integration
    - Trigger build via webhook
    - Poll for build status
    - Retrieve live URL on completion

    - _Requirements: 7.2, 7.4_
  - [ ] 11.3 Implement deployment status tracking
    - Progress indicator with stages (uploading, building, deploying)
    - Error handling with retry option

    - _Requirements: 7.3, 7.5, 7.6_
  - [ ] 11.4 Implement project status update on deployment success
    - Update status to "published"
    - Store live URL
    - _Requirements: 7.7_
  - [ ] 11.5 Write property test for Deployment Status Transition
    - **Property 9: Deployment Status Transition**
    - **Validates: Requirements 7.7**
  - [ ] 11.6 Write unit tests for deployment engine
    - Test GitHub API calls (mocked)
    - Test Cloudflare API calls (mocked)
    - Test status transitions
    - _Requirements: 7.1, 7.2, 7.4, 7.5, 7.6, 7.7_

- [ ] 12. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. WhatsApp CTA Configuration
  - [x] 13.1 Implement WhatsApp configuration form

    - Phone number input with validation
    - Real-time validation feedback
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ] 13.2 Implement WhatsApp button in generated landing page
    - Prominent CTA button
    - Deep link to WhatsApp with configured number
    - _Requirements: 6.5_
  - [ ] 13.3 Write unit tests for WhatsApp configuration
    - Test form validation
    - Test deep link generation
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [-] 14. Project Creation Flow Integration

  - [x] 14.1 Implement project creation wizard

    - Step 1: Business info (name)
    - Step 2: Photo capture
    - Step 3: AI content generation
    - Step 4: Template selection
    - Step 5: WhatsApp configuration
    - Step 6: Preview & Publish
    - _Requirements: 2.2, 3.1-3.5, 4.1-4.5, 5.1-5.5, 6.1-6.5_

  - [ ] 14.2 Implement project edit flow
    - Edit existing project content
    - Re-publish with changes
    - _Requirements: 2.3_
  - [ ] 14.3 Write integration tests for project creation flow
    - Test complete flow from creation to publish
    - Test offline creation and sync
    - _Requirements: All_

- [-] 15. Static Site Templates

  - [x] 15.1 Create Culinary template (HTML/Tailwind)

    - Responsive mobile-first design
    - Photo gallery section
    - Storytelling section
    - WhatsApp CTA button
    - _Requirements: 5.1, 5.2, 6.5_

  - [ ] 15.2 Create Fashion template (HTML/Tailwind)
    - Responsive mobile-first design
    - Product showcase section
    - Brand story section
    - WhatsApp CTA button
    - _Requirements: 5.1, 5.2, 6.5_

  - [ ] 15.3 Create Service template (HTML/Tailwind)
    - Responsive mobile-first design
    - Service description section
    - About section
    - WhatsApp CTA button
    - _Requirements: 5.1, 5.2, 6.5_

  - [x] 15.4 Implement template renderer
    - Populate template with project data
    - Apply selected theme colors
    - Generate final HTML output
    - _Requirements: 5.2, 5.4_


- [x] 16. Final Checkpoint - Ensure all tests pass

  - Ensure all tests pass, ask the user if questions arise.
