import Modal from 'components/Modal';
import { FormikHelpers, useFormik } from 'formik';
import { z, ZodType } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { IIngredient, IngredientTag, ingredientTagInfo } from 'types/ingredient';
import AddTags from 'components/Tag/AddTags';
import Input from 'components/Input';
import styled from 'styled-components';
import ImageInput from 'components/ImageInput';
import Textarea from 'components/Textarea';
import Button from 'components/Button/Button';
import useCreateIngredient from './useCreateIngredient';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IResError } from 'types/common';
import { getAxiosError } from 'utils/common';
import { ICreateIngredientParams } from 'api/ingredients';
import { useEffect, useState } from 'react';
import useEditIngredient from './useEditIngredient';

interface IInitialData extends Omit<ICreateIngredientParams, 'image'> {
  ingredientId: string;
  image?: string;
}

interface IAddIngredientModalProps {
  isOpen: boolean;
  initialData?: IInitialData;
  onClose: () => void;
}

const ingredientSchema: ZodType<ICreateIngredientParams> = z.object({
  name: z.string().min(1, 'Ingredient name is required').max(30, 'Name too long'),
  description: z.string().max(800, 'Description too long'),
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

const initialFormData = {
  name: '',
  description: '',
  tags: [IngredientTag.Custom],
  image: null,
};

const CreateIngredientModal = ({ isOpen, initialData, onClose }: IAddIngredientModalProps) => {
  const createIngerientMutation = useCreateIngredient();
  const editIngredientMutation = useEditIngredient();

  const [initialValues, setInitialValues] = useState(initialFormData);

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setInitialValues({
      ...initialData,
      image: null,
    });
  }, [initialData]);

  const onCreate = (values: ICreateIngredientParams) => {
    return toast.promise<ICreateIngredientParams, AxiosError<IResError>>(
      async () => await createIngerientMutation.mutateAsync(values),
      {
        pending: 'Creating a new ingredient',
        success: {
          render: ({ data: toastData }) => {
            onClose();

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

  const onEdit = (values: ICreateIngredientParams) => {
    if (!initialData) {
      throw new Error('Cannot edit ingredient without initial data');
    }

    return toast.promise<IIngredient, AxiosError<IResError>>(
      async () =>
        await editIngredientMutation.mutateAsync({
          ...values,
          ingredientId: initialData.ingredientId,
        }),
      {
        pending: `Editing ingredient ${initialValues.name}`,
        success: {
          render: ({ data: toastData }) => {
            onClose();

            return (
              <span>
                <b>{toastData.nameEn}</b> ingredient has been edited 👌
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

  const onSubmit = async (
    values: ICreateIngredientParams,
    { resetForm }: FormikHelpers<ICreateIngredientParams>
  ) => {
    if (initialData) {
      await onEdit(values);
    } else {
      await onCreate(values);
    }

    resetForm();
    onClose();
  };

  const { handleBlur, handleSubmit, handleChange, setFieldValue, values, errors } =
    useFormik<ICreateIngredientParams>({
      initialValues,
      enableReinitialize: true,
      validateOnChange: false,
      validateOnBlur: false,
      validate: toFormikValidate(ingredientSchema),
      onSubmit,
    });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit ingredient' : 'Add new ingredient'}
    >
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
              initialImage={initialData?.image}
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

export default CreateIngredientModal;

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
  width: 100%;
`;
