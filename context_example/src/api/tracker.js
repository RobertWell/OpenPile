import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://f6be1cb2db97.ngrok.io';

const instance = axios.create({
    baseURL
});


instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);


export default instance;