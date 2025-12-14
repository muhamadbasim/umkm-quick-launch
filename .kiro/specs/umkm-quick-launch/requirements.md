# Requirements Document

## Introduction

UMKM Quick-Launch adalah Progressive Web App (PWA) mobile-first yang dirancang untuk memberdayakan freelancer digital marketing dalam membangun, deploy, dan mengelola landing page berkualitas tinggi untuk UMKM dalam waktu kurang dari 10 menit. Platform ini menggunakan arsitektur headless yang mengabstraksi kompleksitas GitHub (versioning) dan Cloudflare (hosting) di balik antarmuka "Capture & Publish" yang sederhana, dilengkapi dengan kemampuan AI Vision untuk menghasilkan copy marketing dan storytelling secara otomatis berdasarkan foto yang diunggah.

## Glossary

- **PWA (Progressive Web App)**: Aplikasi web yang dapat diinstal dan berfungsi seperti aplikasi native
- **UMKM**: Usaha Mikro, Kecil, dan Menengah (MSMEs)
- **AI Vision**: Layanan AI yang menganalisis gambar dan menghasilkan deskripsi teks
- **Landing Page**: Halaman web statis yang dioptimalkan untuk konversi
- **Headless Architecture**: Arsitektur di mana frontend terpisah dari backend/deployment
- **GitHub**: Platform version control untuk menyimpan kode
- **Cloudflare Pages**: Layanan hosting untuk situs statis
- **CTA (Call to Action)**: Elemen UI yang mendorong pengguna untuk melakukan aksi tertentu
- **Offline-First**: Pendekatan desain yang memprioritaskan fungsionalitas tanpa koneksi internet

## Requirements

### Requirement 1: PWA Installation & Mobile Experience

**User Story:** As a freelancer, I want to install the app on my phone like a native app, so that I can access it quickly without opening a browser.

#### Acceptance Criteria

1. WHEN a user visits the PWA URL on a mobile browser THEN the System SHALL display an "Add to Home Screen" prompt within 5 seconds of page load
2. WHEN the PWA is installed on a device THEN the System SHALL launch in standalone mode without browser UI elements
3. WHILE the PWA is running THEN the System SHALL maintain responsive layout for screen widths between 320px and 768px
4. WHEN the PWA launches THEN the System SHALL display the dashboard within 3 seconds on a 3G connection

### Requirement 2: Project Dashboard Management

**User Story:** As a freelancer, I want to view and manage all my client projects in one place, so that I can easily track and update multiple UMKM sites.

#### Acceptance Criteria

1. WHEN a user opens the dashboard THEN the System SHALL display a list of all projects with name, thumbnail, status, and last modified date
2. WHEN a user taps "Create New Project" THEN the System SHALL navigate to the project creation flow
3. WHEN a user taps on an existing project THEN the System SHALL navigate to the project detail/edit view
4. WHEN a user swipes left on a project item THEN the System SHALL reveal delete and archive action buttons
5. WHEN projects exist THEN the System SHALL sort projects by last modified date in descending order

### Requirement 3: Photo Capture & Upload

**User Story:** As a freelancer, I want to capture or upload product photos directly in the app, so that I can quickly add visual content for the landing page.

#### Acceptance Criteria

1. WHEN a user taps the camera button THEN the System SHALL open the device camera for photo capture
2. WHEN a user taps the gallery button THEN the System SHALL open the device photo picker
3. WHEN a photo is captured or selected THEN the System SHALL compress the image to under 500KB while maintaining visual quality above 80%
4. WHEN image compression completes THEN the System SHALL display a preview of the compressed image
5. IF image compression fails THEN the System SHALL display an error message and allow retry

### Requirement 4: AI Vision Content Generation

**User Story:** As a freelancer, I want the app to automatically generate marketing copy from product photos, so that I can create compelling content without writing skills.

#### Acceptance Criteria

1. WHEN a compressed image is ready THEN the System SHALL send the image to the AI Vision API for analysis
2. WHEN the AI Vision API returns a response THEN the System SHALL parse and display: product headline, product description, and storytelling paragraph
3. WHILE AI processing is in progress THEN the System SHALL display a loading indicator with estimated time
4. IF the AI Vision API returns an error THEN the System SHALL display a user-friendly error message and provide a manual input fallback
5. WHEN AI-generated content is displayed THEN the System SHALL allow the user to edit any text field before proceeding

### Requirement 5: Template Selection & Customization

**User Story:** As a freelancer, I want to choose from pre-built templates and customize colors, so that I can create visually appealing landing pages that match the business type.

#### Acceptance Criteria

1. WHEN a user reaches the template selection step THEN the System SHALL display available templates categorized by business type (Culinary, Fashion, Service)
2. WHEN a user selects a template THEN the System SHALL display a preview populated with the AI-generated content and uploaded photos
3. WHEN a user taps "Change Theme" THEN the System SHALL display 3-5 preset color theme options
4. WHEN a user selects a color theme THEN the System SHALL update the template preview within 1 second
5. WHEN template customization is complete THEN the System SHALL store the selected template ID and theme ID with the project

### Requirement 6: WhatsApp CTA Configuration

**User Story:** As a freelancer, I want to configure a WhatsApp contact button for the landing page, so that potential customers can easily reach the business owner.

#### Acceptance Criteria

1. WHEN a user reaches the CTA configuration step THEN the System SHALL prompt for the business WhatsApp number
2. WHEN a user enters a phone number THEN the System SHALL validate the format as a valid Indonesian phone number (starting with 08 or +62)
3. IF the phone number format is invalid THEN the System SHALL display a validation error and prevent proceeding
4. WHEN a valid phone number is saved THEN the System SHALL generate a WhatsApp deep link (wa.me format) for the landing page CTA
5. WHEN the landing page is rendered THEN the System SHALL display a prominent "Chat via WhatsApp" button that opens WhatsApp with the configured number

### Requirement 7: Headless Deployment to GitHub & Cloudflare

**User Story:** As a freelancer, I want to publish the landing page with one tap, so that I can deliver a live website to my client without technical knowledge.

#### Acceptance Criteria

1. WHEN a user taps "Publish" THEN the System SHALL create or update a GitHub repository with the generated site content
2. WHEN GitHub commit succeeds THEN the System SHALL trigger a Cloudflare Pages build via webhook
3. WHILE deployment is in progress THEN the System SHALL display a progress indicator with current step (Uploading, Building, Deploying)
4. WHEN Cloudflare build completes successfully THEN the System SHALL return and display the live URL to the user
5. IF GitHub API returns an error THEN the System SHALL log the error, display a user-friendly message, and allow retry
6. IF Cloudflare API returns an error THEN the System SHALL log the error, display a user-friendly message, and allow retry
7. WHEN deployment succeeds THEN the System SHALL update the project status to "Published" and store the live URL

### Requirement 8: Offline Mode & Data Sync

**User Story:** As a freelancer working in the field, I want to create and edit projects without internet connection, so that I can work in areas with poor connectivity.

#### Acceptance Criteria

1. WHILE the device is offline THEN the System SHALL allow creating new projects, capturing photos, and editing content
2. WHILE the device is offline THEN the System SHALL store all changes in local storage (IndexedDB)
3. WHEN the device regains internet connection THEN the System SHALL automatically sync pending changes to the server
4. WHILE sync is in progress THEN the System SHALL display a sync indicator in the UI
5. IF sync fails THEN the System SHALL retain local data and retry sync on next connection
6. WHEN viewing a project offline THEN the System SHALL display cached project data and images

### Requirement 9: Project Data Persistence

**User Story:** As a freelancer, I want my project data to be saved reliably, so that I never lose my work.

#### Acceptance Criteria

1. WHEN a user makes changes to a project THEN the System SHALL auto-save changes to local storage within 2 seconds
2. WHEN the device is online THEN the System SHALL sync project data to the backend server
3. WHEN a user opens the app THEN the System SHALL load projects from local cache first, then sync with server
4. WHEN serializing project data for storage THEN the System SHALL encode the data as JSON
5. WHEN deserializing project data from storage THEN the System SHALL parse the JSON and reconstruct the project object
