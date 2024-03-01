import axios from "axios";

export const Axios = async ({
  method,
  config,
  data,
  url,
  headers,
  timeout = 50000,
  file = false,
  language,
}) => {
  const source = axios.CancelToken.source();

  const axiosConfig = {
    method: method,
    url: url,
    data: data,
    headers: {
      ...headers,
      lang: language,
      Authorization: `Bearer ${localStorage.getItem("GreenTreesToken")}`,
    },
    timeout: timeout,
    cancelToken: source.token,
    ...config,
  };

  try {
    axios.interceptors.request.use((request) => {
      return request;
    });

    const response = await axios(axiosConfig);

    axios.interceptors.response.use((response) => {
      return response;
    });
    if (response.data?.status == 'out') {
      window.location.reload();
    }

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else {
    }

    return error?.message;
  }
};
