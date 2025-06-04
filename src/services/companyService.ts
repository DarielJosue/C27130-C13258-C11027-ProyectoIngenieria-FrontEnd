import apiClient from "./apiClient";
import { useAuthStore } from "@/stores/authStore";

/*export async function createCompany(payload: any) {
    await apiClient.post('/register-company', payload);
}*/

export const createCompany = async (companyData:
    {
        company_name: string;
        description: string;
        phone: string;
        location: string;
        website: string;
        company_size: string;
        specialties: string;
    }
) => {
    const response = await apiClient.post('/company/registerCompany', companyData);
    const authStore = useAuthStore();
    authStore.setCompanyId(response.data.company_id);
    console.log('el id de la empresa es:', authStore.getCompanyId());
    return response.data;

};
export async function getCompanyByUser() {
    const response = await apiClient.get('/company/by-user');
    return response.data?.company ?? null;
}