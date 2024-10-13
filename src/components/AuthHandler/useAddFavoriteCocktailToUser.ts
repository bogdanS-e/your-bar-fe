import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavoriteCocktailToUser } from 'api/user';
import { IUser } from 'types/user';
import { getAxiosError } from 'utils/common';
import { AxiosError } from 'axios';
import { IResError } from 'types/common';

const useAddFavoriteCocktailToUser = (cocktailId: string) => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      return await addFavoriteCocktailToUser(cocktailId, accessToken);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['user'] });

      const previousUser = queryClient.getQueryData<IUser>(['user']);
      const previousFavoriteCocktails = previousUser?.favoriteCocktails || [];

      queryClient.setQueryData(['user'], (oldUser: IUser) => ({
        ...oldUser,
        favoriteCocktails: [...previousFavoriteCocktails, cocktailId],
      }));

      return { previousUser };
    },
    onError: (error: AxiosError<IResError>, _, context) => {
      toast.error(getAxiosError(error));
      queryClient.setQueryData(['user'], context?.previousUser);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export default useAddFavoriteCocktailToUser;
