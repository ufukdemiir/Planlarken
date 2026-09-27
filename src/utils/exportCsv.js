import Papa from 'papaparse';

export const exportToCsv = (projectMeta, categories, items, filename = 'Planlarken-Hedefler.csv') => {
  if (!items || items.length === 0) {
    alert('Dışa aktarılacak görev veya hedef bulunmuyor.');
    return;
  }

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {});

  const rows = items.map((item, index) => ({
    'No': index + 1,
    'Başlık': item.title,
    'Kategori': categoryMap[item.categoryId] || 'Genel',
    'Başlangıç Tarihi': item.startDate,
    'Bitiş Tarihi': item.endDate,
    'Dönüm Noktası (Milestone)': item.milestone ? 'Evet' : 'Hayır',
    'Tamamlandı': item.completed ? 'Evet' : 'Hayır',
    'Notlar': item.notes || ''
  }));

  const csvContent = Papa.unparse(rows, {
    quotes: true,
    header: true
  });

  // UTF-8 BOM ekleyelim ki Excel Türkçe karakterleri (İ, ş, ç, ğ, ö, ü) düzgün açsın
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
