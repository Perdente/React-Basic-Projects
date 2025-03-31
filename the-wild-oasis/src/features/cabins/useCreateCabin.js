import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: handleCreate, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin, // newCabin => createEditCabin(newCabin)

    onSuccess: () => {
      toast.success('New Cabin successfully created🎉', { theme: 'colored' });
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },

    onError: (err) => {
      toast.error(err.message, { theme: 'colored' });
    },
  });

  return { isCreating, handleCreate };
}
