import * as yup from 'yup';


export const validationSchema = [
    yup.object({
    fullName: yup.string().required('Full name is required'),
    address1: yup.string().required('Address 1 is required'),
    address2: yup.string().required('Address 2 is required'),
    city: yup.string().required('City name is required'),
    state: yup.string().required('State name is required'),
    zip: yup.string().required('Zipcode is required'),
    country: yup.string().required('Country name is required')
    }),

    // For the review form, though nothing to be validated 
    yup.object(),
    //payment form 
    yup.object({
        nameOnCard: yup.string().required()
    })

]; // ARRAY of yup objects 
    
        
   