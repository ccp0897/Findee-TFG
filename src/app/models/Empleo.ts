export default interface Empleo {
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
    publishDate: string; // O Date si prefieres
    guardado?: boolean;

}