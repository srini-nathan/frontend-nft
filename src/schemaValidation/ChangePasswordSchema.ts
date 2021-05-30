import * as Yup from 'yup';
export const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required('Please enter a password.'),
    newPassword: Yup.string()
      .min(7, 'Please enter a longer password.')
      .required('Please enter a password.'),
    verifyPassword: Yup.string()
      .oneOf(
        [Yup.ref('newPassword')],
        'Please make sure your passwords are the same.'
      )
    
})