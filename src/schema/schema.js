import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
});

export const forgetSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});
export const ResetPasswordschema = Yup.object({
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Required password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required confirm password"),
});

export const profileschema = Yup.object().shape({
  name: Yup.string().min(3, "Full Name must be at least 3 characters").required("Full Name is required"),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  email: Yup.string().email("Enter a valid email address").required("Email is required"),
});

export const addressschema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string().required("Mobile number is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zip code is required"),
  address1: Yup.string().required("Address is required"),
});

export const inquirySchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
   mobile_number: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  description: Yup.string().required("Description is required"),
})

export const bankPaymentSchema = Yup.object({
  transactionId: Yup.string().required("transaction ID is required"),
  receiptImage: Yup.string().required("Receipt image is requireed")
})


export const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  mobile_number: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Enter a valid mobile number")
    .required("Mobile number is required"),

  subject: Yup.string()
    .min(3, "Subject must be at least 3 characters")
    .required("Subject is required"),

  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

export const signupWholesaleSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  mobile_number: Yup.string().required("Mobile number is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string().required("Pincode is required"),
  businessDetail: Yup.string().required("Business detail is required"),
  GSTNumber: Yup.string().required("GST number is required"),
});