import apiClient from './apiClient';


export const getProfile = async () => {
    const response = await apiClient.get('profile/');
    return response.data;
};
 
export const getUserData = async () => {
    const response = await apiClient.get(`/me`);  
    return response.data;
};

export const createProfile = async (payload: {
    user_id: string;
    biography?: string;
    phone_number?: string;
    address?: string;
}) => {
    const response = await apiClient.post('/profile/create', payload);
    return response.data;
};

export const uploadProfilePicture = async (file: File) => {
    const formData = new FormData();
    formData.append('profile_picture', file);

    const response = await apiClient.post('/profile/upload-profile-picture', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateProfilePicture = async (payload: { //proximamente
    user_id: string;
    profile_picture: File;
}) => {
    const formData = new FormData();
    formData.append('user_id', payload.user_id);
    formData.append('profile_picture', payload.profile_picture);

    const response = await apiClient.post('/profile/update-profile-picture', formData, {

    });
    return response.data;
}
