import { environment } from "../environments/environment"

export const apiUrls = {
    usersApi: `${environment.API_BASE_URL}user/`,
    adminApi: `${environment.API_BASE_URL}admin/`,
    therapistsApi: `${environment.API_BASE_URL}therapist/`
}

/* 
    usersApi: 'http://localhost:8000/api/user/',
    adminApi: 'http://localhost:8000/api/admin/',
    therapistsApi: 'http://localhost:8000/api/therapist/'
*/