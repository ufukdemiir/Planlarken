/* Türkçe karakter referansı (kod içinde kontrol amaçlı):
   Büyük: Ç Ğ İ Ö Ş Ü
   Küçük: ç ğ ı i ö ş ü
*/

export const defaultProjectData = {
  projectMeta: {
    title: "2026-2027 Kariyer ve Kisisel Gelisim Plani",
    subtitle: "Geleceginizi planlarken karmasaya yer yok.",
    startDate: "2026-10-01",
    endDate: "2026-12-31",
    paperSize: "A4",
    orientation: "landscape",
    theme: "light"
  },
  categories: [
    { id: "c1", name: "Is ve Kariyer",   color: "#F97316" },
    { id: "c2", name: "Saglik ve Spor",  color: "#10B981" },
    { id: "c3", name: "Finans",          color: "#6366F1" }
  ],
  items: [
    {
      id: "item1",
      title: "Web Uygulamasi Yayini",
      startDate: "2026-10-01",
      endDate: "2026-10-15",
      categoryId: "c1",
      milestone: true,
      completed: false,
      notes: "GitHub Pages uzerinden canli yayina alma"
    },
    {
      id: "item2",
      title: "Online Sertifika Programi",
      startDate: "2026-10-10",
      endDate: "2026-11-30",
      categoryId: "c1",
      milestone: false,
      completed: false,
      notes: "Haftada 5 saat modüler calisma"
    },
    {
      id: "item3",
      title: "Maraton Hazirligi",
      startDate: "2026-10-01",
      endDate: "2026-11-20",
      categoryId: "c2",
      milestone: false,
      completed: false,
      notes: "Haftada 3 gun kos antremani"
    },
    {
      id: "item4",
      title: "Yil Sonu Butce Plani",
      startDate: "2026-12-01",
      endDate: "2026-12-31",
      categoryId: "c3",
      milestone: true,
      completed: false,
      notes: "2027 yili yatirim ve tasarruf hedefleri"
    }
  ]
};
