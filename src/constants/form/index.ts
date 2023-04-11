const INPUT_TYPE = {
  PASSWORD: 'password',
  TEXT: 'text',
  EMAIL: 'email',
} as const;

export const REGISTRATION_FORM_FIELDS = [
  {
    register: 'email',
    placeholder: 'Enter your email',
    type: INPUT_TYPE.EMAIL,
  },
  {
    register: 'password',
    placeholder: 'Enter a new password',
    type: INPUT_TYPE.PASSWORD,
  },
  {
    register: 'confirmPassword',
    placeholder: 'Confirm your password',
    type: INPUT_TYPE.PASSWORD,
  },
];
