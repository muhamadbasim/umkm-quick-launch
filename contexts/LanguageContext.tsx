import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'id';

export const translations = {
  en: {
    app: {
      deleteConfirm: "Are you sure you want to delete this project?"
    },
    dashboard: {
      title: "Local Brands",
      subtitle: "Next level execution for your clients.",
      emptyTitle: "Start Your Collection",
      emptySubtitle: "Launch a high-impact brand site in minutes.",
      newProject: "New Project",
    },
    createProject: {
      uploadTitle: "Showcase Brand",
      uploadSubtitle: "Upload a photo. We'll craft a premium digital presence instantly.",
      tapToTake: "Tap to Take Photo",
      changePhoto: "Change Photo",
      analyzeBtn: "Analyze with AI",
      cancelBtn: "Cancel",
      analyzingTitle: "AI Vision Working...",
      analyzingSteps: "Detecting objects...\nCrafting storytelling...\nDesigning layout...",
      editContent: "Edit Content",
      businessName: "Business Name",
      headline: "Headline Hook",
      story: "Story (Description)",
      whatsapp: "WhatsApp Number",
      whatsappHint: "Customers will click to chat.",
      location: "Business Location",
      locationHint: "Address will appear on your landing page.",
      detectLocation: "📍 Detect My Location",
      detecting: "Detecting...",
      designStyle: "Design Style",
      livePreview: "Live Preview",
      updatesInstantly: "Updates instantly as you type.",
      launchBtn: "🚀 Launch Website",
      enterWhatsappBtn: "Enter WhatsApp to Launch",
      launchingTitle: "Launching Brand",
      successTitle: "Site is Live! 🚀",
      launchingSubtitle: "Please wait while we set up your infrastructure.",
      successSubtitle: "Your landing page has been successfully deployed.",
      step1: "Generating Code",
      step1Desc: "Writing HTML & Tailwind CSS...",
      step2: "Pushing to GitHub",
      step2Desc: "Committing changes to repository...",
      step3: "Deploying to GitHub Pages",
      step3Desc: "Building and propagating DNS...",
      backDashboard: "Back to Dashboard",
      viewSite: "View Live Site",
      failedAnalyze: "Failed to analyze image. Please try again."
    },
    projectCard: {
      viewSite: "View Site",
      share: "Share",
      edit: "Edit",
      delete: "Delete",
      linkCopied: "Link copied to clipboard!"
    },
    shareModal: {
      title: 'Share Project',
      copyLabel: 'Or copy link',
      copyBtn: 'Copy',
      copiedBtn: 'Copied!',
    }
  },
  id: {
    app: {
      deleteConfirm: "Apakah Anda yakin ingin menghapus proyek ini?"
    },
    dashboard: {
      title: "Merek Lokal",
      subtitle: "Eksekusi level berikutnya untuk klien Anda.",
      emptyTitle: "Mulai Koleksi Anda",
      emptySubtitle: "Luncurkan situs merek berdampak tinggi dalam hitungan menit.",
      newProject: "Proyek Baru",
    },
    createProject: {
      uploadTitle: "Tampilkan Merek",
      uploadSubtitle: "Unggah foto. Kami akan membuat kehadiran digital premium secara instan.",
      tapToTake: "Ketuk untuk Ambil Foto",
      changePhoto: "Ubah Foto",
      analyzeBtn: "Analisa dengan AI",
      cancelBtn: "Batal",
      analyzingTitle: "Visi AI Bekerja...",
      analyzingSteps: "Mendeteksi objek...\nMerangkai cerita...\nMerancang tata letak...",
      editContent: "Edit Konten",
      businessName: "Nama Bisnis",
      headline: "Judul Utama",
      story: "Cerita (Deskripsi)",
      whatsapp: "Nomor WhatsApp",
      whatsappHint: "Pelanggan akan klik untuk chat.",
      location: "Lokasi Bisnis",
      locationHint: "Alamat akan muncul di halaman landing Anda.",
      detectLocation: "📍 Deteksi Lokasi Saya",
      detecting: "Mendeteksi...",
      designStyle: "Gaya Desain",
      livePreview: "Pratinjau Langsung",
      updatesInstantly: "Update instan saat Anda mengetik.",
      launchBtn: "🚀 Luncurkan Website",
      enterWhatsappBtn: "Masukkan WA untuk Luncurkan",
      launchingTitle: "Meluncurkan Merek",
      successTitle: "Situs Telah Tayang! 🚀",
      launchingSubtitle: "Mohon tunggu sementara kami menyiapkan infrastruktur.",
      successSubtitle: "Halaman landas Anda telah berhasil diterapkan.",
      step1: "Menghasilkan Kode",
      step1Desc: "Menulis HTML & Tailwind CSS...",
      step2: "Mendorong ke GitHub",
      step2Desc: "Menyimpan perubahan ke repositori...",
      step3: "Deploy ke GitHub Pages",
      step3Desc: "Membangun dan mempropaganda DNS...",
      backDashboard: "Kembali ke Dashboard",
      viewSite: "Lihat Situs Langsung",
      failedAnalyze: "Gagal menganalisis gambar. Silakan coba lagi."
    },
    projectCard: {
      viewSite: "Lihat Situs",
      share: "Bagikan",
      edit: "Ubah",
      delete: "Hapus",
      linkCopied: "Tautan disalin ke papan klip!"
    },
    shareModal: {
      title: 'Bagikan Proyek',
      copyLabel: 'Atau salin tautan',
      copyBtn: 'Salin',
      copiedBtn: 'Disalin!',
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load language from localStorage on mount
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('local-brands-language');
    return stored === 'id' ? 'id' : 'en';
  });

  // Custom setter that persists to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('local-brands-language', lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};