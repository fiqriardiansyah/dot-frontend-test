/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axiosClient.defaults.timeout = 5000;

export default axiosClient;
