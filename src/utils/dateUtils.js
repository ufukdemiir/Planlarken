/**
 * Tarih hesaplama ve ölçekleme modlarını belirleyen yardımcı fonksiyonlar
 */

export const calculateDaysDifference = (startDateStr, endDateStr) => {
  if (!startDateStr || !endDateStr) return 0;
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
};

export const getScaleMode = (diffDays) => {
  if (diffDays <= 7) return 'micro'; // Akış Modu (1-7 gün)
  if (diffDays <= 180) return 'medium'; // Grid & Swimlane Modu (1 hafta - 6 ay)
  return 'macro'; // Yol Haritası / Roadmap Modu (6 ay - 10+ yıl)
};

export const formatDate = (dateStr, formatStyle = 'short') => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  
  if (formatStyle === 'short') {
    return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' }).format(d);
  }
  if (formatStyle === 'medium') {
    return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  }
  if (formatStyle === 'year') {
    return d.getFullYear().toString();
  }
  if (formatStyle === 'time') {
    return new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(d);
  }
  return d.toLocaleDateString('tr-TR');
};

export const getDaysArray = (startDateStr, endDateStr) => {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const days = [];
  
  const current = new Date(start);
  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return days;
};

export const getMonthsArray = (startDateStr, endDateStr) => {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const months = [];
  
  const current = new Date(start.getFullYear(), start.getMonth(), 1);
  const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
  
  while (current <= endMonth) {
    months.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }
  return months;
};

export const getYearsArray = (startDateStr, endDateStr) => {
  const startYear = new Date(startDateStr).getFullYear();
  const endYear = new Date(endDateStr).getFullYear();
  const years = [];
  for (let y = startYear; y <= endYear; y++) {
    years.push(y);
  }
  return years;
};
