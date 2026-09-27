import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPdf = async (elementId, filename = 'Planlarken-Zaman-Haritasi.pdf', paperSize = 'A4', orientation = 'landscape') => {
  const element = document.getElementById(elementId);
  if (!element) {
    alert('Planlama tuvali bulunamadı.');
    return;
  }

  try {
    // Canvas dönüşümü için yüksek DPI çözünürlüğü (scale: 2.5)
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#18181B', // Canvas rengini koru
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    
    // jsPDF Yapılandırması
    const isLandscape = orientation === 'landscape';
    const pdf = new jsPDF({
      orientation: isLandscape ? 'l' : 'p',
      unit: 'mm',
      format: paperSize.toLowerCase() === 'a3' ? 'a3' : 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Ortala ve sığdır
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Birden fazla sayfa gerekiyorsa ekle
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('PDF üretilirken hata oluştu:', error);
    alert('PDF indirme sırasında bir sorun oluştu. Lütfen tekrar deneyin.');
  }
};
