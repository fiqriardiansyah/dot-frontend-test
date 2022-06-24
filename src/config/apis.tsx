import { AxiosResponse, AxiosRequestConfig } from 'axios';
import axiosClient from './axios';

export const Pokemon = {
  getPokemons() {
    return {
      url: '/pokemon/',
    };
  },
};

export default class Api {
  static get<T>(data: { url: string}) {
    return axiosClient.get(data.url) as Promise<AxiosResponse<T, any>>;
  }
}
