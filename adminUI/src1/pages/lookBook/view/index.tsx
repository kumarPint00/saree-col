import React, { useRef, useState } from 'react';
import { useForm, Controller,useFieldArray } from 'react-hook-form';
import { Button, TextField, Grid, Checkbox, FormControlLabel, Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Define custom styles
const useStyles = makeStyles((theme) => ({
    formContainer: {
      maxWidth: 500,
      margin: 'auto',
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
    },
    textField: {
      marginBottom: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
    imagePreview: {
      width: 200,
      height: 200,
      border: '1px solid #ccc',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
  }));

const AddLookBookForm = ({ onSubmit }) => {
    const classes = useStyles();
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm();
    const hiddenInputRef = useRef();
    const [preview, setPreview] = useState(null);
    // const [products, setProducts] = useState([]);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "products",
    });
    const [products, setProducts] = useState([{ name: '', price: '' }]);

    const addProduct = () => {
      setProducts([...products, { name: '', price: '' }]);
    };
    const handleUploadedFile = (event) => {
      const file = event.target.files[0];
      const urlImage = URL.createObjectURL(file);
      setPreview(urlImage);
    };
  
    const onUpload = () => {
      hiddenInputRef.current.click();
    };
  
    const uploadButtonLabel = preview? "Change image" : "Upload image";


    // const addProduct = () => {
    //     append({ name: '', price: '' });
    //   };
  
      // Step 3: Render the products dynamically
      const renderProducts = () => {
        return products.map((product, index) => (
          <Grid item xs={12} key={index}>
            <TextField
              label="Product Name"
              {...register(`products.${index}.name`, { required: 'Product name is required' })}
              fullWidth
              className={classes.textField}
              error={!!errors.products[index]?.name}
              helperText={errors.products[index]?.name?.message}
            />
            <TextField
              label="Price"
              type="number"
              {...register(`products.${index}.price`, { required: 'Price is required' })}
              fullWidth
              className={classes.textField}
              error={!!errors.products[index]?.price}
              helperText={errors.products[index]?.price?.message}
            />
          </Grid>
        ));
      };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
      <Typography variant="h6" align="center">Add LookBook</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            {...register('name', { required: 'Name is required' })}
            fullWidth
            className={classes.textField}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            multiline
            rows={4}
            {...register('description', { required: 'Description is required' })}
            fullWidth
            className={classes.textField}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Searchable Text"
            {...register('searchableText')}
            fullWidth
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Version"
            type="number"
            {...register('version', { required: 'Version is required' })}
            fullWidth
            className={classes.textField}
            error={!!errors.version}
            helperText={errors.version?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.imagePreview}>
            {preview && <Avatar src={preview} />}
          </div>
          <Button variant="contained" color="primary" onClick={onUpload}>
            {uploadButtonLabel}
          </Button>
          <input
            type="file"
            name="image"
            style={{ display: 'none' }}
            onChange={handleUploadedFile}
            ref={hiddenInputRef}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Controller
                name="showInHomePage"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} />}
              />
            }
            label="Show in Homepage"
          />
        </Grid>
        <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} key={index}>
            <TextField
              label="Product Name"
              {...register(`products.${index}.name`, { required: 'Product name is required' })}
              fullWidth
            //   error={!!errors.products[index]?.name}
            //   helperText={errors.products[index]?.name?.message}
            />
            <TextField
              label="Price"
              type="number"
              {...register(`products.${index}.price`, { required: 'Price is required' })}
              fullWidth
            //   error={!!errors.products[index]?.price}
            //   helperText={errors.products[index]?.price?.message}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addProduct}>
            Add Product
          </Button>
        </Grid>
      </Grid>
        {/* {renderProducts()} */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit" className={classes.submitButton}>
            Add LookBook
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddLookBookForm;
