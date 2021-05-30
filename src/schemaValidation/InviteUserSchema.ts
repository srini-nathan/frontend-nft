import * as Yup from 'yup';
export const InviteUserSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email")
      .required('Field cannot be blank'),
    
    
})