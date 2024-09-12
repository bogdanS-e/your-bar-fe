import Modal from 'components/Modal';
import { useFormik } from 'formik';
import { z, ZodType } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { IngredientTag, ingredientTagInfo } from 'types/ingredient';
import AddTags from 'components/Tag/AddTags';
import Input from 'components/Input';
import styled from 'styled-components';
import ImageInput from 'components/ImageInput';
import Textarea from 'components/Textarea';
import Button from 'components/Button/Button';
import useCreateIngredient, {
  IIngredientFormValues,
} from './useCreateIngredient';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IResError } from 'types/common';
import getAxiosError from 'utils/getAxiosError';

interface IAddIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ingredientSchema: ZodType<IIngredientFormValues> = z.object({
  name: z
    .string()
    .min(1, 'Ingredient name is required')
    .max(30, 'Name too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description too long'),
  tags: z.array(z.number()).nonempty('At least one tag is required'),
  image: z
    .any() // You can't directly use `z.instanceof(File)` in a Node.js environment, so you use `z.any()` and refine.
    .refine((file) => file instanceof File || file === null, {
      message: 'Invalid file format',
    })
    .refine((file) => !file || (file && file.size <= 5 * 1024 * 1024), {
      message: 'Image size should be less than 5MB',
    })
    .nullable(),
});

const AddIngredientModal = ({ isOpen, onClose }: IAddIngredientModalProps) => {
  const createIngerientMutation = useCreateIngredient();

  const onCreate = (values: IIngredientFormValues) => {
    return toast.promise<IIngredientFormValues, AxiosError<IResError>>(
      async () => await createIngerientMutation.mutateAsync(values),
      {
        pending: 'Creating a new ingredient',
        success: {
          render: ({ data: toastData }) => {
            close();

            return (
              <span>
                <b>{toastData.name}</b> ingredient has been added 👌
              </span>
            );
          },
        },
        error: {
          render: ({ data }) => getAxiosError(data),
        },
      }
    );
  };

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    resetForm,
  } = useFormik<IIngredientFormValues>({
    initialValues: {
      name: '',
      description: '',
      tags: [IngredientTag.Custom],
      image: null,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: toFormikValidate(ingredientSchema),
    onSubmit: async (values) => {
      await onCreate(values);
      resetForm();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add new ingredient">
      <Form onSubmit={handleSubmit}>
        <NameWrapper>
          <div>
            <div>
              <Input
                label="Ingredient name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />

              {errors?.name && <ErrorText>{errors.name}</ErrorText>}
            </div>

            <div>
              <StyledAddTags
                allTags={Object.values(ingredientTagInfo).map(({ key }) => key)}
                selectedTags={values.tags}
                onChange={(selectedOptions) => {
                  setFieldValue('tags', selectedOptions);
                }}
                isIngredient
              />

              {errors?.tags && <ErrorText>{errors.tags}</ErrorText>}
            </div>
          </div>
          <div>
            <ImageInput
              onImageChange={(file) => setFieldValue('image', file)}
            />

            {errors?.image && <ErrorText>{errors.image}</ErrorText>}
          </div>
        </NameWrapper>

        <StyledTextarea
          rows={10}
          id="description"
          name="description"
          placeholder="Enter the ingredient description..."
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors?.description && <ErrorText>{errors.description}</ErrorText>}

        <ActionWrapper>
          <Button type="submit" disabled={createIngerientMutation.isPending}>
            Submit
          </Button>
        </ActionWrapper>
      </Form>
    </Modal>
  );
};

export default AddIngredientModal;

const ErrorText = styled.small`
  font-size: 0.625rem;
  color: red;
  display: block;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const StyledTextarea = styled(Textarea)`
  margin-top: 10px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: start;
  gap: 20px;
  justify-content: space-between;

  > div:first-child {
    flex: 1;
  }
`;

const StyledAddTags = styled(AddTags)`
  margin-top: 10px;
  flex-wrap: wrap;
`;

const Form = styled.form`
  color: #525252;
  max-width: 436px;
  width: 100%;
`;
