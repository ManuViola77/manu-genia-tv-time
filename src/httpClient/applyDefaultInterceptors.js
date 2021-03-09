import humps from "humps";

const applyDefaultInterceptors = (client) => {
  client.interceptors.request.use((config) => {
    const { data } = config;
    config.data = data ? humps.decamelizeKeys(data) : {};
    return config;
  });

  client.interceptors.response.use(
    async (response) => {
      const { data } = response;
      response.data = humps.camelizeKeys(data);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default applyDefaultInterceptors;
