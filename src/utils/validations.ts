import * as yup from 'yup';

const PresonalInfoValid = yup.object().shape({
  first_name: yup.string().required('مطلوب الأسم الأول'),
  last_name: yup.string().required('مطلوب أسم العائلة'),
});

const RegisterValid = yup.object().shape({
  email: yup
    .string()
    .email('البريد الألكتروني غير صحيح')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'البريد الألكتروني غير صحيح')
    .required('البريد الألكتروني مطلوب'),
  password: yup
    .string()
    .required('الرقم السري مطلوب')
    .min(8, 'Password must be at least 8 characters'),

  password_confirmation: yup
    .string()
    .required('تأكيد الرقم السري مطلوب')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export { PresonalInfoValid, RegisterValid };
