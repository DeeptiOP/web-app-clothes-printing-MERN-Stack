import React from 'react';
import { calculatePasswordStrength, getPasswordStrengthLabel, getPasswordStrengthColor } from '../utils/passwordUtils';

const PasswordStrengthIndicator = ({ password }) => {
  const strength = calculatePasswordStrength(password);
  const label = getPasswordStrengthLabel(strength);
  const colorClass = getPasswordStrengthColor(strength);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600">Password Strength:</span>
        <span className={`text-xs font-medium ${
          strength <= 1 ? 'text-red-600' :
          strength <= 2 ? 'text-orange-600' :
          strength <= 3 ? 'text-yellow-600' :
          strength <= 4 ? 'text-blue-600' :
          'text-green-600'
        }`}>
          {label}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full ${
              level <= strength ? colorClass : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;




