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
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IResError } from 'types/common';
import getAxiosError from 'utils/getAxiosError';
import { cocktailTagInfo } from 'types/cocktail';
import AddIngredients from './AddIngredients';

interface IAddIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCocktailModal = ({ isOpen, onClose }: IAddIngredientModalProps) => {

  const { values, errors, handleChange, handleBlur, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      description: '',
      recipe: '',
      tags: [],
      image: null,
    },
    onSubmit: () => { },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add new cocktail">
      <Form >
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
              onImageChange={(file) => setFieldValue('image', file)}
            />

            {errors?.image && <ErrorText>{errors.image}</ErrorText>}
          </div>
        </NameWrapper>

        <Description
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
          <Recipe
            rows={5}
            id="recipe"
            name="recipe"
            placeholder="1) Pour 50ml vodka into a shaker......"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors?.recipe && <ErrorText>{errors.recipe}</ErrorText>}
        </div>

            <AddIngredients />

        <ActionWrapper>
          <Button type="submit"/*  disabled={createIngerientMutation.isPending} */>
            Submit
          </Button>
        </ActionWrapper>
      </Form>
    </Modal>
  );
};

export default AddCocktailModal;

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

const Description = styled(Textarea)`
  margin: 10px 0;
`;

const Recipe = styled(Textarea)`
  margin-bottom: 10px;
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
