import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import useCreateCabin from './useCreateCabin';
import useEditCabin from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { isCreating, handleCreate } = useCreateCabin();
  const { isEditing, handleEdit } = useEditCabin();

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const isLoading = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    // console.log(data);

    if (isEditSession) {
      handleEdit(
        {
          newCabinData: { ...data, image },
          id: editId,
        },
        { onSuccess: () => reset() }
      );
    } else handleCreate({ ...data, image: image }, { onSuccess: () => reset() });

    onClose?.();
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose ? 'modal' : 'regular'}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register('name', {
            required: 'name field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register('maxCapacity', {
            valueAsNumber: true,
            required: 'maxCapacity field is required',
            min: {
              value: 1,
              message: 'Minimum value should be greater than 0',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register('regularPrice', {
            valueAsNumber: true,
            required: 'regularPrice field is required',
            min: {
              value: 1,
              message: 'Minimum value should be greater than 0',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          defaultValue={0}
          {...register('discount', {
            valueAsNumber: true,
            required: 'discount field is required',
            validate: (value) => value <= getValues().regularPrice || 'discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isLoading}
          defaultValue=""
          {...register('description', {
            required: 'description field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'image field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isLoading}>{isEditSession ? 'Edit Cabin' : 'Create New Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
