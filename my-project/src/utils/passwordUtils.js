// Password validation and strength utilities

export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors, strength: 0 };
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password)
  };
};

export const calculatePasswordStrength = (password) => {
  if (!password) return 0;

  let strength = 0;
  const checks = [
    password.length >= 8, // Length
    /[A-Z]/.test(password), // Uppercase
    /[a-z]/.test(password), // Lowercase
    /\d/.test(password), // Number
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), // Special char
    password.length >= 12, // Extra length
    /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password) // All requirements
  ];

  strength = checks.filter(Boolean).length;
  return Math.min(strength, 5); // Max strength of 5
};

export const getPasswordStrengthLabel = (strength) => {
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return labels[strength] || 'Very Weak';
};

export const getPasswordStrengthColor = (strength) => {
  const colors = [
    'bg-red-500', // Very Weak
    'bg-orange-500', // Weak
    'bg-yellow-500', // Fair
    'bg-blue-500', // Good
    'bg-green-500', // Strong
    'bg-green-600' // Very Strong
  ];
  return colors[strength] || 'bg-red-500';
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  if (name.trim().length > 50) {
    return { isValid: false, error: 'Name must be less than 50 characters' };
  }
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return { isValid: false, error: 'Name can only contain letters and spaces' };
  }
  return { isValid: true };
};




