import { PublishRequest } from '../types';

/**
 * Generate a complete landing page HTML from project data
 */
export function generateLandingPage(data: PublishRequest): string {
    const { businessName, headline, story, phone, imageUrl, templateId } = data;

    // WhatsApp link (Indonesian format)
    const whatsappLink = `https://wa.me/${phone.replace(/\D/g, '')}?text=Halo, saya tertarik dengan ${encodeURIComponent(businessName)}`;

    // Template-specific colors
    const themeColors = {
        culinary: {
            primary: '#f97316', // Orange
            secondary: '#ea580c',
            accent: '#fff7ed',
            gradient: 'from-orange-500 to-red-500',
        },
        fashion: {
            primary: '#8b5cf6', // Purple
            secondary: '#7c3aed',
            accent: '#f5f3ff',
            gradient: 'from-purple-500 to-pink-500',
        },
        service: {
            primary: '#0ea5e9', // Sky Blue
            secondary: '#0284c7',
            accent: '#f0f9ff',
            gradient: 'from-sky-500 to-blue-500',
        },
    };

    const theme = themeColors[templateId] || themeColors.service;

    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(businessName)} - ${escapeHtml(headline)}</title>
  <meta name="description" content="${escapeHtml(story)}">
  <meta property="og:title" content="${escapeHtml(businessName)}">
  <meta property="og:description" content="${escapeHtml(story)}">
  <meta property="og:image" content="${escapeHtml(imageUrl)}">
  <meta name="theme-color" content="${theme.primary}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { font-family: 'Inter', sans-serif; }
    .hero-gradient { background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%); }
    .text-gradient { background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .btn-primary { background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%); transition: all 0.3s ease; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(0,0,0,0.15); }
    .card { backdrop-filter: blur(10px); background: rgba(255,255,255,0.95); }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .float { animation: float 3s ease-in-out infinite; }
    @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
    .pulse-ring::before { content: ''; position: absolute; inset: -8px; border-radius: 50%; background: ${theme.primary}; animation: pulse-ring 2s ease-out infinite; z-index: -1; }
  </style>
</head>
<body class="bg-gray-50 min-h-screen">
  <!-- Hero Section -->
  <section class="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
    <!-- Decorative Elements -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
    
    <div class="max-w-4xl mx-auto text-center relative z-10">
      <!-- Product Image -->
      <div class="mb-8 float">
        <div class="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
          <img 
            src="${escapeHtml(imageUrl)}" 
            alt="${escapeHtml(businessName)}"
            class="w-full h-full object-cover"
          >
        </div>
      </div>
      
      <!-- Brand Name -->
      <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
        ${escapeHtml(businessName)}
      </h1>
      
      <!-- Headline -->
      <p class="text-xl md:text-2xl text-white/90 font-medium mb-6 max-w-2xl mx-auto">
        ${escapeHtml(headline)}
      </p>
      
      <!-- Story -->
      <p class="text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
        ${escapeHtml(story)}
      </p>
      
      <!-- CTA Button -->
      <a 
        href="${whatsappLink}" 
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary inline-flex items-center gap-3 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Chat via WhatsApp
      </a>
    </div>
  </section>
  
  <!-- Features Section -->
  <section class="py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12 text-gradient">Kenapa Memilih Kami?</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="card p-6 rounded-2xl shadow-lg text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style="background-color: ${theme.accent}">
            <svg class="w-8 h-8" style="color: ${theme.primary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="font-bold mb-2">Kualitas Terjamin</h3>
          <p class="text-gray-600 text-sm">Produk terbaik dengan standar kualitas tinggi</p>
        </div>
        <div class="card p-6 rounded-2xl shadow-lg text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style="background-color: ${theme.accent}">
            <svg class="w-8 h-8" style="color: ${theme.primary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="font-bold mb-2">Respon Cepat</h3>
          <p class="text-gray-600 text-sm">Layanan pelanggan yang responsif dan ramah</p>
        </div>
        <div class="card p-6 rounded-2xl shadow-lg text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style="background-color: ${theme.accent}">
            <svg class="w-8 h-8" style="color: ${theme.primary}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="font-bold mb-2">Pelanggan Puas</h3>
          <p class="text-gray-600 text-sm">Kepuasan pelanggan adalah prioritas kami</p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Floating WhatsApp Button -->
  <a 
    href="${whatsappLink}" 
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform pulse-ring z-50"
  >
    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
  
  <!-- Footer -->
  <footer class="py-8 px-4 text-center text-gray-500 text-sm">
    <p>&copy; ${new Date().getFullYear()} ${escapeHtml(businessName)}. All rights reserved.</p>
    <p class="mt-2">
      Powered by <a href="#" class="text-gradient font-semibold">Local Brands</a>
    </p>
  </footer>
</body>
</html>`;
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
    const htmlEscapes: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };
    return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}
