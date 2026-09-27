/**
 * RFC 5545 standartına uygun .ics Takvim Dosyası Üretici
 */

const formatIcsDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}${month}${day}T090000Z`; // UTC 09:00 Varsayılan
};

export const exportToIcs = (projectMeta, categories, items, filename = 'Planlarken-Takvim.ics') => {
  if (!items || items.length === 0) {
    alert('Takvime aktarılacak öge bulunamadı.');
    return;
  }

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {});

  let icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Planlarken//Zaman Haritasi ve Planlayici//TR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${projectMeta.title || 'Planlarken Takvimi'}`
  ];

  items.forEach((item) => {
    const dtStart = formatIcsDate(item.startDate);
    const dtEnd = formatIcsDate(item.endDate || item.startDate);
    const summary = item.milestone ? `[Milestone] ${item.title}` : item.title;
    const categoryName = categoryMap[item.categoryId] || 'Genel';

    icsLines.push('BEGIN:VEVENT');
    icsLines.push(`UID:planlarken-${item.id}-${Date.now()}@planlarken.local`);
    icsLines.push(`DTSTAMP:${formatIcsDate(new Date().toISOString())}`);
    icsLines.push(`DTSTART:${dtStart}`);
    icsLines.push(`DTEND:${dtEnd}`);
    icsLines.push(`SUMMARY:${summary}`);
    icsLines.push(`CATEGORIES:${categoryName}`);
    if (item.notes) {
      icsLines.push(`DESCRIPTION:${item.notes.replace(/\n/g, '\\n')}`);
    }
    icsLines.push('END:VEVENT');
  });

  icsLines.push('END:VCALENDAR');

  const icsString = icsLines.join('\r\n');
  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
