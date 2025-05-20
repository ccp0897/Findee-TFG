export interface EmpleoRecomendado {
  // Campos originales de Empleo
  id: number;
  title: string;
  jobCategory: string;
  description: string;
  companyName: string;
  city: string;
  contractType: string;
  workday: string;
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: string;
  salaryCurrency: string;
  salaryType: string;
  remote: string;
  publishDate: string; // O Date si lo conviertes a objeto Date

  // Campos adicionales generados por IA
  matchScore: number; // 0-100% de compatibilidad
  matchReasons: string[]; // Razones de compatibilidad
  missingSkills: string[]; // Habilidades faltantes
  suggestedImprovements: string[]; // Sugerencias de mejora
  aiAnalysis: string; // Análisis textual detallado
}