import axiosInstance from './axiosInstance';

//send token. BE will create a new user if not exist
export const getUser = async (token: string) => {
  const { data } = await axiosInstance.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
