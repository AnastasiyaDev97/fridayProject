type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    confirmPassword?: string
}
export const validates=(values:any)=>{
    const errors: FormikErrorType = {};
    const passwordRegex = /(?=.*[0-9])/
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 8) {
        errors.password = "Password must be 8 characters long.";
    } else if (!passwordRegex.test(values.password)) {
        errors.password = "Invalid password. Must contain one number.";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
    }
    if (values.password && values.confirmPassword) {
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Password not matched";
        }
    }
    return errors;
}