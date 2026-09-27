/**
 * Tarih hesaplama ve ol-cekleme yardimci fonksiyonlari
 * Turkce takvim formatlama icin tr-TR locale kullanilir
 */

export const calculateDaysDifference = (startDateStr, endDateStr) => {
  if (!startDateStr || !endDateStr) return 0;
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
};

export const getScaleMode = (diffDays) => {
  if (diffDays <= 7)   return 'micro';   // Akis Modu
  if (diffDays <= 180) return 'medium';  // Swimlane Modu
  return 'macro';                         // Yol Haritasi
};

export const getScaleLabel = (mode) => {
  if (mode === 'micro')  return 'Akis Modu (1-7 Gun)';
  if (mode === 'medium') return 'Kulvar Modu (Hafta - 6 Ay)';
  return 'Yol Haritasi (6 Ay+)';
};

export const formatDateTR = (dateStr, style = 'short') => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00'); // Saat ekle - timezone kaymasini onle
  if (isNaN(d.getTime())) return dateStr;

  try {
    if (style === 'short') {
      return new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'short'
      }).format(d);
    }
    if (style === 'medium') {
      return new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(d);
    }
    if (style === 'monthYear') {
      return new Intl.DateTimeFormat('tr-TR', {
        month: 'short',
        year: 'numeric'
      }).format(d);
    }
    if (style === 'year') {
      return String(d.getFullYear());
    }
  } catch {
    // Intl desteklenmiyorsa fallback
    return dateStr;
  }
  return dateStr;
};

export const getDaysArray = (startDateStr, endDateStr) => {
  const start = new Date(startDateStr + 'T12:00:00');
  const end   = new Date(endDateStr   + 'T12:00:00');
  const days  = [];
  const cur   = new Date(start);
  while (cur <= end) {
    days.push(cur.toISOString().split('T')[0]);
    cur.setDate(cur.getDate() + 1);
  }
  return days;
};

export const getMonthsArray = (startDateStr, endDateStr) => {
  const start = new Date(startDateStr + 'T12:00:00');
  const end   = new Date(endDateStr   + 'T12:00:00');
  const months = [];
  const cur = new Date(start.getFullYear(), start.getMonth(), 1);
  const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
  while (cur <= endMonth) {
    months.push(new Date(cur));
    cur.setMonth(cur.getMonth() + 1);
  }
  return months;
};

export const getYearsArray = (startDateStr, endDateStr) => {
  const startYear = new Date(startDateStr).getFullYear();
  const endYear   = new Date(endDateStr).getFullYear();
  const years = [];
  for (let y = startYear; y <= endYear; y++) {
    years.push(y);
  }
  return years;
};

export const getDayName = (dateStr) => {
  const d = new Date(dateStr + 'T12:00:00');
  try {
    return new Intl.DateTimeFormat('tr-TR', { weekday: 'long' }).format(d);
  } catch {
    return '';
  }
};
