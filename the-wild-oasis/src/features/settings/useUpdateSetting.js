import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { updateSetting } from '../../services/apiSettings';

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: handleUpdateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSetting,

    onSuccess: () => {
      toast.success('Setting successfully edited🎉', { theme: 'colored' });
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },

    onError: (err) => {
      toast.error(err.message, { theme: 'colored' });
    },
  });

  return { isUpdating, handleUpdateSetting };
}
