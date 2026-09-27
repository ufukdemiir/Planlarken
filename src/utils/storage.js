import { defaultProjectData } from './defaultData';

const KEY = 'planlarken_v2';

export const loadProjectData = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProjectData;
    const parsed = JSON.parse(raw);
    if (!parsed?.projectMeta || !parsed?.categories || !parsed?.items) {
      return defaultProjectData;
    }
    return parsed;
  } catch {
    return defaultProjectData;
  }
};

export const saveProjectData = (data) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // localStorage dolu olabilir, sessizce gec
  }
};

export const clearProjectData = () => {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
};
