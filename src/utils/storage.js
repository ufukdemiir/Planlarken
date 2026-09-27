import { defaultProjectData } from './defaultData';

const STORAGE_KEY = 'planlarken_project_data_v1';

export const loadProjectData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultProjectData;
    const parsed = JSON.parse(saved);
    if (!parsed || !parsed.projectMeta || !parsed.categories || !parsed.items) {
      return defaultProjectData;
    }
    return parsed;
  } catch (error) {
    console.error('LocalStorage okuma hatası:', error);
    return defaultProjectData;
  }
};

export const saveProjectData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('LocalStorage kaydetme hatası:', error);
  }
};

export const clearProjectData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('LocalStorage silme hatası:', error);
  }
};
