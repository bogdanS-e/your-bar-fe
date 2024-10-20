import Modal from 'components/Modal';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { z, ZodType } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import AddTags from 'components/Tag/AddTags';
import Input from 'components/Input';
import styled from 'styled-components';
import ImageInput from 'components/ImageInput';
import Textarea from 'components/Textarea';
import Button from 'components/Button/Button';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IResError } from 'types/common';
import { getAxiosError, urlToFile } from 'utils/common';
import { cocktailTagInfo, CocktailUnit, ICocktail } from 'types/cocktail';
import AddIngredients from './AddIngredients';
import useCreateCocktail from './useCreateCocktail';
import { ICreateCocktailParams, IIngredientParam } from 'api/cocktails';
import { useEffect, useState } from 'react';
import useEditCocktail from './useEditCocktail';

interface IInitialData extends Omit<ICreateCocktailParams, 'image'> {
  cocktailId: string;
  image?: string;
}

interface ICreateIngredientModalProps {
  isOpen: boolean;
  initialData?: IInitialData;
  onClose: () => void;
}

const cocktailSchema: ZodType<ICreateCocktailParams> = z.object({
  name: z.string().min(1, 'Cocktail name is required').max(30, 'Name too long'),
  description: z.string().min(1, 'Description is required').max(800, 'Description too long'),
  recipe: z.string().min(1, 'Recipe is required').max(1000, 'Recipe too long'),
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
  ingredients: z
    .array(
      z.object({
        ingredientId: z.string().min(1, 'Ingredient is required'),
        isOptional: z.boolean(),
        isDecoration: z.boolean(),
        value: z
          .union([z.string().transform((val) => Number(val)), z.number()])
          .refine((val) => !isNaN(val), { message: 'Value must be a valid number' })
          .refine((val) => val > 0, { message: 'Value must be greater than 0' }),
        unit: z.number().min(0, 'Unit is required'),
      })
    )
    .max(10, 'No cocktail has 10 ingredients'),
});

const emptyIngredient: IIngredientParam = {
  ingredientId: '',
  value: '0',
  unit: CocktailUnit.Ml,
  isOptional: false,
  isDecoration: false,
};

const initialFormData: ICreateCocktailParams = {
  name: '',
  description: '',
  recipe: '',
  tags: [],
  image: null,
  ingredients: [emptyIngredient],
};

const CreateCocktailModal = ({ isOpen, initialData, onClose }: ICreateIngredientModalProps) => {
  const createCocktailMutation = useCreateCocktail();
  const editCocktailMutation = useEditCocktail();
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

  const onCreate = (values: ICreateCocktailParams) => {
    return toast.promise<ICreateCocktailParams, AxiosError<IResError>>(
      async () => await createCocktailMutation.mutateAsync(values),
      {
        pending: 'Creating a new cocktail',
        success: {
          render: ({ data: toastData }) => {
            onClose();

            return (
              <span>
                <b>{toastData.name}</b> cocktail has been added 👌
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

  const onEdit = (values: ICreateCocktailParams) => {
    if (!initialData) {
      throw new Error('Cannot edit cocktail without initial data');
    }

    return toast.promise<ICocktail, AxiosError<IResError>>(
      async () =>
        await editCocktailMutation.mutateAsync({ ...values, cocktailId: initialData.cocktailId }),
      {
        pending: `Editing cocktail ${initialValues.name}`,
        success: {
          render: ({ data: toastData }) => {
            onClose();

            return (
              <span>
                <b>{toastData.nameEn}</b> cocktail has been edited 👌
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
    values: ICreateCocktailParams,
    { resetForm }: FormikHelpers<ICreateCocktailParams>
  ) => {
    if (initialData) {
      await onEdit(values);
    } else {
      await onCreate(values);
    }

    resetForm();
    onClose();
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit cocktail' : 'Add new cocktail'}
    >
      <Formik
        initialValues={initialValues}
        validate={toFormikValidate(cocktailSchema)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, handleBlur, handleChange, errors }) => (
          <StyledForm>
            <NameWrapper>
              <div>
                <div>
                  <Input
                    label="Cocktail name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors?.name && <ErrorText>{errors.name}</ErrorText>}
                </div>

                <div>
                  <StyledAddTags
                    allTags={Object.values(cocktailTagInfo).map(({ key }) => key)}
                    selectedTags={values.tags}
                    onChange={(selectedOptions) => {
                      setFieldValue('tags', selectedOptions);
                    }}
                    isIngredient={false}
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

            <Textarea
              rows={5}
              id="description"
              name="description"
              placeholder="Enter the cocktail description..."
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors?.description && <ErrorText>{errors.description}</ErrorText>}

            <RecipeWrapper>
              <span>Recipe:</span>
              <Textarea
                rows={5}
                id="recipe"
                name="recipe"
                placeholder="1) Pour 50ml vodka into a shaker......"
                value={values.recipe}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors?.recipe && <ErrorText>{errors.recipe}</ErrorText>}
            </RecipeWrapper>

            <AddIngredientsWrapper>
              <AddIngredients />
              <FieldArray name="ingredients">
                {({ push }) => (
                  <AddIngredientButton type="button" onClick={() => push({ ...emptyIngredient })}>
                    Add ingredient
                  </AddIngredientButton>
                )}
              </FieldArray>
              {errors?.ingredients && <ErrorText>{errors.ingredients as string}</ErrorText>}
            </AddIngredientsWrapper>

            <ActionWrapper>
              <Button type="submit" /*  disabled={createIngerientMutation.isPending} */>
                Submit
              </Button>
            </ActionWrapper>
          </StyledForm>
        )}
      </Formik>
    </StyledModal>
  );
};

export default CreateCocktailModal;

const StyledModal = styled(Modal)`
  max-width: 500px !important;
`;

const AddIngredientButton = styled(Button)`
  padding: 8px;
  margin-top: 10px;
  line-height: normal;
  color: #81c784;
  border-color: currentColor;

  &:hover {
    border-color: currentColor;
  }
`;

const AddIngredientsWrapper = styled.div`
  margin: 15px 0;
`;

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

const RecipeWrapper = styled.div`
  margin: 10px 0;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: start;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 10px;

  > div:first-child {
    flex: 1;
  }
`;

const StyledAddTags = styled(AddTags)`
  margin-top: 10px;
  flex-wrap: wrap;
`;

const StyledForm = styled(Form)`
  color: #525252;
  width: 100%;
`;
