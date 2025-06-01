import apiClient from '@/services/apiClient';

export const uploadCurriculum = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', 'Currículum subido para aplicar');

    const response = await apiClient.post('/curriculum/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.curriculum.cv_id;  
};


export const getUserCurriculums = async () => {
    const response = await apiClient.get('/curriculum');
    console.log("mensaje", response.data.message);
    return response.data;
};

