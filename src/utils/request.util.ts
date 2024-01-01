import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class RequestUtil {
  static makePostRequest = (
    url: string,
    data: Record<string, any> | string,
    headers?: Record<string, any>,
    timeout?: number,
  ) => {
    return RequestUtil.getAxiosInstance(headers, timeout).post(url, data);
  };

  static makeGetRequest = (
    url: string,
    headers?: Record<string, any>,
    timeout?: number,
  ): Promise<AxiosResponse> => {
    return RequestUtil.getAxiosInstance(headers, timeout).get(url);
  };

  static makePatchRequest = (
    url: string,
    data: object,
    headers?: Record<string, any>,
    timeout?: number,
  ) => {
    return RequestUtil.getAxiosInstance(headers, timeout).patch(url, data);
  };

  /**
   * Single axios instance for all our calls.
   * @param headers
   * @returns
   */
  private static getAxiosInstance = (
    headers?: any,
    timeout = 30000,
  ): AxiosInstance => {
    console.log('headers', headers);

    return axios.create({
      timeout,
      headers,
    });
  };
}
