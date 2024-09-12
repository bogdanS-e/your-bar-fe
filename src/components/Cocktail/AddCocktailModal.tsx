import Modal from 'components/Modal';
import { FieldArray, Form, Formik, useFormik } from 'formik';
import { z, ZodType } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { IngredientTag, ingredientTagInfo } from 'types/ingredient';
import AddTags from 'components/Tag/AddTags';
import Input from 'components/Input';
import styled from 'styled-components';
import ImageInput from 'components/ImageInput';
import Textarea from 'components/Textarea';
import Button from 'components/Button/Button';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IResError } from 'types/common';
import getAxiosError from 'utils/getAxiosError';
import {
  CocktailTag,
  cocktailTagInfo,
  ICocktailngredient,
} from 'types/cocktail';
import AddIngredients from './AddIngredients';

interface IAddIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ICocktailngredientFormValues extends ICocktailngredient {
  name: string;
}

export interface ICocktailFormValues {
  name: string;
  description: string;
  recipe: string;
  tags: CocktailTag[];
  image?: null | File;
  ingredients: ICocktailngredientFormValues[];
}

const cocktailSchema: ZodType<ICocktailFormValues> = z.object({
  name: z.string().min(1, 'Cocktail name is required').max(30, 'Name too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description too long'),
  recipe: z.string().min(1, 'Recipe is required').max(500, 'Recipe too long'),
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
  ingredients: z.array(
    z.object({
      ingredientId: z.string(),
      name: z
        .string()
        .min(1, 'Ingredient name is required')
        .max(30, 'Name too long'),
      value: z.number().min(1, 'Value must be greater than 0'),
      unit: z.string().min(1, 'Unit is required'),
    })
  ),
});

const emptyIngredient = {
  ingredientId: '',
  name: '',
  value: 0,
  unit: '',
}

const AddCocktailModal = ({ isOpen, onClose }: IAddIngredientModalProps) => {
  const initialValues: ICocktailFormValues = {
    name: '',
    description: '',
    recipe: '',
    tags: [],
    image: null,
    ingredients: [emptyIngredient],
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add new cocktail">
      <Formik
        initialValues={initialValues}
        validate={toFormikValidate(cocktailSchema)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          console.log(values);
        }}
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
                    allTags={Object.values(cocktailTagInfo).map(
                      ({ key }) => key
                    )}
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

            <div>
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
            </div>

            <AddIngredientsWrapper>
              <AddIngredients />
              <FieldArray name="ingredients">
                {({ push }) => (
                  <AddIngredientButton type="button" onClick={() => push({ ...emptyIngredient })}>
                    Add ingredient
                  </AddIngredientButton>
                )}
              </FieldArray>
            </AddIngredientsWrapper>

            <ActionWrapper>
              <Button
                type="submit" /*  disabled={createIngerientMutation.isPending} */
              >
                Submit
              </Button>
            </ActionWrapper>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCocktailModal;

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

const StyledForm = styled(Form)`
  color: #525252;
  max-width: 436px;
  width: 100%;
`;
