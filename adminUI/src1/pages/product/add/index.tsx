// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Accordion from '@mui/material/Accordion'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// ** Third Party Imports

// ** Icons Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// Styled component for the Box wrappers in Delivery Options' accordion

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'
import axios from 'axios'

const ProductAddition = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:9758/api/product/addProduct', data);
      toast.success('Category created successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const [expanded, setExpanded] = useState('panel1')

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const expandIcon = value => (expanded === value ? <Minus /> : <Plus />)


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ChevronDown />}
          id='form-layouts-collapsible-header-1'
          aria-controls='form-layouts-collapsible-content-1'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            Add Product
          </Typography>
        </AccordionSummary>
        <Divider sx={{ m: 0 }} />
        <AccordionDetails>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Name' placeholder='name' {...register('name')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField multiline rows={3} fullWidth label='Description' placeholder='description' {...register('description')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='FabricComposition' placeholder='fabric composition' {...register('fabricComposition')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='trims' placeholder='trims' {...register('trims')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Sustainability' placeholder='sustainability' {...register('sustainability')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='WashCare' placeholder='wash care' {...register('washCare')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='style' placeholder='style' {...register('style')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='SearchableText' placeholder='searchable text' {...register('searchableText')} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ChevronDown />}
          id='form-layouts-collapsible-header-2'
          aria-controls='form-layouts-collapsible-content-2'
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            Variants
          </Typography>
        </AccordionSummary>
        <Divider sx={{ m: 0 }} />
        <AccordionDetails>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='ColorId' placeholder='colorid' {...register('colorId')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Quantity' placeholder='quantity' {...register('quantity')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Price' placeholder='price' {...register('price')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Discount' placeholder='discount' {...register('discount')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ChevronDown />}
                  id='variant-sizes-collapsible-header'
                  aria-controls='variant-sizes-collapsible-content'
                >
                  <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                    Variant Sizes
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Size' placeholder='size' {...register('size')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Price' placeholder='price' {...register('price')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Quantity' placeholder='quantity' {...register('quantity')} />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Images' placeholder='images' {...register('images')} />
            </Grid>
          </Grid>
        </AccordionDetails>
        <Divider sx={{ m: 0 }} />
      </Accordion>
      <AccordionDetails>
        <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
          Add Product
        </Button>
        <Button size='large' variant='outlined'>
          Cancel
        </Button>
      </AccordionDetails>
    </form>
  );
};

export default ProductAddition;
