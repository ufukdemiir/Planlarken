import Papa from 'papaparse';

/**
 * CSV Export — UTF-8 BOM ile (Excel Turkce karakter destegi icin zorunlu)
 */
export const exportToCsv = (projectMeta, categories, items, filename) => {
  if (!items || items.length === 0) {
    alert('Disari aktarilacak oge bulunamadi.');
    return;
  }

  const safeFilename = filename || 'Planlarken.csv';

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {});

  const rows = items.map((item, index) => ({
    'No': index + 1,
    'Baslik': item.title,
    'Kategori': categoryMap[item.categoryId] || 'Genel',
    'Baslangic Tarihi': item.startDate,
    'Bitis Tarihi': item.endDate,
    'Donum Noktasi': item.milestone ? 'Evet' : 'Hayir',
    'Tamamlandi': item.completed ? 'Evet' : 'Hayir',
    'Notlar': item.notes || ''
  }));

  const csvContent = Papa.unparse(rows, { quotes: true, header: true });

  // UTF-8 BOM (\uFEFF) — Excel'in Turkce karakterleri dogru okumasi icin gerekli
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = safeFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
