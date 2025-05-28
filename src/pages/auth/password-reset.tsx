import { useState } from 'react';
import { Link } from 'react-router-dom';

const PasswordReset = () => {
  const [code, setCode] = useState(Array(6).fill(''));

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    const nextInput = document.getElementById(`code-${index + 1}`);
    if (value && nextInput) (nextInput as HTMLInputElement).focus();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold text-primary sm:text-5xl">WebKamai</h1>
       <div className="text-center gap-2 flex flex-col ">
         <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">PASSWORD RESET</h2>
        <p className="text-center text-sm text-gray-600">
          We sent a code to <span className="font-medium">amelie@untitledui.com</span>
        </p>
       </div>

        <div className="flex justify-center space-x-3">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-14 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button className="w-full bg-blue-500 text-white py-3 rounded-full text-sm font-medium hover:bg-[#0c1324] transition">
          Continue
        </button>

        <div className="text-center text-sm text-gray-600">
          Didn't receive the email?
          <button className="text-blue-600 font-medium hover:underline">Click to resend</button>
        </div>

        <div className="text-center text-sm">
          <Link to="/login" className="text-gray-700 hover:underline">&larr; Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
