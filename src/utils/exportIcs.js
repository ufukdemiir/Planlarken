/**
 * ICS Export — RFC 5545 standart takvim formati
 * Encoding: UTF-8, Turkce karakter guvenli
 */

const toIcsDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  const pad = (n) => String(n).padStart(2, '0');
  return (
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    'T090000Z'
  );
};

// ICS icerik satirlarini guvenlice kodlar (Turkce dahil)
const escapeIcs = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
};

export const exportToIcs = (projectMeta, categories, items, filename) => {
  if (!items || items.length === 0) {
    alert('Takvime aktarilacak oge bulunamadi.');
    return;
  }

  const safeFilename = filename || 'Planlarken.ics';

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {});

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Planlarken//ZamanHaritasi//TR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeIcs(projectMeta.title || 'Planlarken')}`,
    'X-WR-TIMEZONE:Europe/Istanbul'
  ];

  items.forEach((item) => {
    const catName = categoryMap[item.categoryId] || 'Genel';
    const summary = item.milestone
      ? `[Milestone] ${item.title}`
      : item.title;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:planlarken-${item.id}@planlarken`);
    lines.push(`DTSTAMP:${toIcsDate(new Date().toISOString().split('T')[0])}`);
    lines.push(`DTSTART;VALUE=DATE:${(item.startDate || '').replace(/-/g, '')}`);
    lines.push(`DTEND;VALUE=DATE:${(item.endDate || item.startDate || '').replace(/-/g, '')}`);
    lines.push(`SUMMARY:${escapeIcs(summary)}`);
    lines.push(`CATEGORIES:${escapeIcs(catName)}`);
    if (item.notes) {
      lines.push(`DESCRIPTION:${escapeIcs(item.notes)}`);
    }
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');

  // UTF-8 BOM ile blob olustur
  const icsString = lines.join('\r\n');
  const blob = new Blob(['\uFEFF' + icsString], {
    type: 'text/calendar;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = safeFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
