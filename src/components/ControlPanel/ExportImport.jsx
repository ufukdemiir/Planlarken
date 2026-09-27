import React, { useRef } from 'react';
import { Download, Upload, FileCode, FileSpreadsheet, Calendar, Printer } from 'lucide-react';
import { exportToPdf } from '../../utils/exportPdf';
import { exportToCsv } from '../../utils/exportCsv';
import { exportToIcs } from '../../utils/exportIcs';

export const ExportImport = ({
  projectData,
  onImportJson,
  onResetDefault
}) => {
  const fileInputRef = useRef(null);

  const handleExportPdf = () => {
    exportToPdf(
      'printable-canvas',
      `${projectData.projectMeta.title || 'Planlarken'}.pdf`,
      projectData.projectMeta.paperSize || 'A4',
      projectData.projectMeta.orientation || 'landscape'
    );
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${projectData.projectMeta.title || 'Planlarken'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCsv = () => {
    exportToCsv(
      projectData.projectMeta,
      projectData.categories,
      projectData.items,
      `${projectData.projectMeta.title || 'Planlarken'}.csv`
    );
  };

  const handleExportIcs = () => {
    exportToIcs(
      projectData.projectMeta,
      projectData.categories,
      projectData.items,
      `${projectData.projectMeta.title || 'Planlarken'}.ics`
    );
  };

  const handleFileChange = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && parsed.projectMeta && parsed.categories && parsed.items) {
            onImportJson(parsed);
            alert("Plan dosyası başarıyla yüklendi!");
          } else {
            alert("Geçersiz JSON formatı. Lütfen geçerli bir Planlarken .json dosyası seçin.");
          }
        } catch (error) {
          alert("JSON dosyası ayrıştırılamadı.");
        }
      };
    }
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-lg">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <h3 className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
          <Download className="w-3.5 h-3.5 text-orange-400" />
          Dışa Aktar & İçe Aktar
        </h3>
        <span className="text-[10px] text-zinc-500 font-mono">4 Format</span>
      </div>

      {/* PDF Ana Indirme Butonu */}
      <button
        onClick={handleExportPdf}
        className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
      >
        <Printer className="w-4 h-4" />
        <span>Baskıya Hazır .PDF İndir</span>
      </button>

      {/* Diğer Formatlar Grubu */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={handleExportJson}
          className="p-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[11px] font-medium text-zinc-300 hover:text-orange-400 transition-colors flex flex-col items-center gap-1"
          title="Yedekleme ve Düzenleme için JSON Proje Dosyası"
        >
          <FileCode className="w-4 h-4 text-orange-400" />
          <span>.JSON</span>
        </button>

        <button
          onClick={handleExportCsv}
          className="p-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[11px] font-medium text-zinc-300 hover:text-emerald-400 transition-colors flex flex-col items-center gap-1"
          title="Excel / Sheets için CSV Tablosu"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>.CSV</span>
        </button>

        <button
          onClick={handleExportIcs}
          className="p-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[11px] font-medium text-zinc-300 hover:text-indigo-400 transition-colors flex flex-col items-center gap-1"
          title="Apple / Google Takvim İçe Aktarım Dosyası"
        >
          <Calendar className="w-4 h-4 text-indigo-400" />
          <span>.ICS Takvim</span>
        </button>
      </div>

      {/* JSON Import & Reset */}
      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 py-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[11px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>JSON Planı Yükle</span>
        </button>

        <button
          onClick={onResetDefault}
          className="px-2.5 py-1.5 text-[11px] text-zinc-500 hover:text-red-400 transition-colors"
          title="Varsayılan Örnek Veriye Dön"
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
};
