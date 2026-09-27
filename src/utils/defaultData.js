export const defaultProjectData = {
  projectMeta: {
    title: "2026 Stratejik Yol Haritası & Kişisel Gelişim Planı",
    subtitle: "Geleceğinizi planlarken karmaşaya yer yok.",
    startDate: "2026-10-01",
    endDate: "2026-12-31",
    paperSize: "A4", // A4 veya A3
    orientation: "landscape", // landscape veya portrait
    theme: "orange-dark"
  },
  categories: [
    { id: "c1", name: "İş & Kariyer", color: "#F97316" }, // Turuncu
    { id: "c2", name: "Kişisel Gelişim & Sağlık", color: "#10B981" }, // Zümrüt Yeşil
    { id: "c3", name: "Finans & Yatırım", color: "#6366F1" } // İndigo
  ],
  items: [
    {
      id: "item1",
      title: "Planlarken Web Uygulaması Lansmanı",
      startDate: "2026-10-05",
      endDate: "2026-10-20",
      categoryId: "c1",
      milestone: true,
      completed: false,
      notes: "GitHub Pages üzerinden canlıya alma, SEO optimizasyonu ve Etsy şablon entegrasyonu."
    },
    {
      id: "item2",
      title: "Yapay Zeka ve Yazılım Mimarisi Sertifikası",
      startDate: "2026-10-15",
      endDate: "2026-11-30",
      categoryId: "c1",
      milestone: false,
      completed: false,
      notes: "Haftada 6 saat modüler çalışma ve projelerin tamamlanması."
    },
    {
      id: "item3",
      title: "Maraton Koşusu Hazırlık Kampı",
      startDate: "2026-10-01",
      endDate: "2026-11-15",
      categoryId: "c2",
      milestone: true,
      completed: true,
      notes: "Haftalık 35 km koşu ve düzenli antrenman takibi."
    },
    {
      id: "item4",
      title: "Dijital Portföy ve Yatırım Sepeti Güncellemesi",
      startDate: "2026-11-01",
      endDate: "2026-11-10",
      categoryId: "c3",
      milestone: false,
      completed: false,
      notes: "Yıllık fon dağılımlarının gözden geçirilmesi."
    },
    {
      id: "item5",
      title: "Kış Dönemi Kitap Okuma Listesi",
      startDate: "2026-10-01",
      endDate: "2026-12-31",
      categoryId: "c2",
      milestone: false,
      completed: false,
      notes: "Felsefe ve sistem tasarımı üzerine 6 adet eser."
    },
    {
      id: "item6",
      title: "2027 Yılı Bütçe ve Hedef Kapanışı",
      startDate: "2026-12-15",
      endDate: "2026-12-30",
      categoryId: "c3",
      milestone: true,
      completed: false,
      notes: "Yıl sonu muhasebe ve stratejik planlama oturumu."
    }
  ]
};
