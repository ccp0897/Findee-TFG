export default interface LoginResponse {
    token: string;
    email: string;
    nombre: string;
    message: string;
    success: boolean;
    id: number;
}