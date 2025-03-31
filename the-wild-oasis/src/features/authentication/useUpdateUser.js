import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: ({ user }) => {
      toast.success('User successfully updated🎉', { theme: 'colored' });
      queryClient.setQueriesData(['user'], user);
      // queryClient.invalidateQueries({ queryKey: ['user'] });
    },

    onError: (err) => {
      toast.error(err.message, { theme: 'colored' });
    },
  });

  return { isUpdating, updateUser };
}
