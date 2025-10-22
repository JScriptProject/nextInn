

const emailValidation = (password) =>{
if (password.length < 8) {
  return "Password should be at least 8 characters long" ;
} else if (!/[A-Z]/.test(password)) {
  return "Password must contain at least one uppercase letter" ;
} else if (!/[a-z]/.test(password)) {
  return "Password must contain at least one lowercase letter" ;
} else if (!/[0-9]/.test(password)) {
  return "Password must contain at least one number";
} else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  return "Password must contain at least one special character";
} else {
  return "OK";
}
}