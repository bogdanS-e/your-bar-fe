import Modal from 'components/Modal';
import { useFormik, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { z, ZodType } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { IngredientTag } from '../../types/ingredient';
import AddTags from 'components/Tag/AddTags';
import Input from 'components/Input';
import styled from 'styled-components';
import ImageInput from 'components/ImageInput';

interface IIngredientFormValues {
  name: string;
  description: string;
  tags: IngredientTag[];
  image?: File | null;
}

// Zod schema definition
const ingredientSchema: ZodType<IIngredientFormValues> = z.object({
  name: z
    .string()
    .min(1, 'Ingredient name is required')
    .max(100, 'Name too long'),
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

const AddIngredients = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<IngredientTag[]>([]);

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
  } = useFormik<IIngredientFormValues>({
    initialValues: {
      name: '',
      description: '',
      tags: [],
      image: null,
    },
    validateOnChange: false,
    validate: toFormikValidate(ingredientSchema),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };
  console.log(errors);

  return (
    <>
      <button onClick={open}>Add ingredients</button>

      <Modal isOpen={isOpen} onClose={close} title="Add new ingredient">
        <Form onSubmit={handleSubmit}>
          <NameWrapper>
            <div>
              <Input
                label="Ingredient name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              <StyledAddTags
                allTags={Object.values(IngredientTag).filter(
                  (value) => typeof value === 'number'
                )}
                selectedTags={values.tags}
                onChange={(selectedOptions) => {
                  setFieldValue('tags', selectedOptions);
                }}
                isIngredient
              />
            </div>
            <ImageInput onImageChange={() => {}} />
          </NameWrapper>

          {/* <div>
            <label htmlFor="image">Thumbnail</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.currentTarget.files
                  ? event.currentTarget.files[0]
                  : null;
                setFieldValue('image', file);
              }}
            />
          </div> */}

          <div>
            <textarea
              id="description"
              name="description"
              placeholder="Description..."
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Modal>
    </>
  );
};

export default AddIngredients;

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
  margin: 10px 0;
  flex-wrap: wrap;
`;

const Form = styled.form`
  color: #525252;
  max-width: 436px;
  width: 100%;
`;
