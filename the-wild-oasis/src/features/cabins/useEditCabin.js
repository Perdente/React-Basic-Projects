import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: handleEdit, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),

    onSuccess: () => {
      toast.success('Cabin successfully edited🎉', { theme: 'colored' });
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },

    onError: (err) => {
      toast.error(err.message, { theme: 'colored' });
    },
  });

  return { isEditing, handleEdit };
}
