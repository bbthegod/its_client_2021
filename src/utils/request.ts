import axios, { AxiosResponse } from 'axios';
import jwt from 'jsonwebtoken';
import { BASE_URL } from 'constants/url';
import { MASTERKEY } from 'constants/master';

export class ResponseError extends Error {
  public response: AxiosResponse;

  constructor(response: AxiosResponse) {
    super(response.statusText);
    this.response = response;
  }
}

function parseJSON(response: AxiosResponse) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

// function checkStatus(response: AxiosResponse) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//   throw new ResponseError(response);
// }

export async function request(payload) {
  try {
    const auth = localStorage.getItem('auth') ? jwt.verify(localStorage.getItem('auth'), 'shhhhh') : null;
    let instance = axios.create({ baseURL: BASE_URL });
    instance.interceptors.request.use(
      function (config) {
        config.headers.Authorization = payload.url !== '/auth/login' ? `Bearer ${auth.token}` : `Bearer ${MASTERKEY}`;
        return config;
      },
      error => Promise.reject(error),
    );
    instance.interceptors.response.use(
      response => response,
      error => Promise.reject(error),
    );
    const fetchResponse = await instance(payload);
    return { response: parseJSON(fetchResponse), error: undefined };
  } catch (error) {
    return { response: undefined, error };
  }
}
