/**
 * PDF Export: Tarayicinin dogal print sistemi kullanilir.
 * window.print() yontemi vektorel, yuksek cozunurluklu ve
 * Turkce karakter destekli cikti saglar.
 * CSS @media print kurallari src/index.css dosyasinda tanimlidir.
 */
export const exportToPdf = () => {
  window.print();
};
