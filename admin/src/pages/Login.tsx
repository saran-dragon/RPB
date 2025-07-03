import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/bookings');
    } catch (err) {
      setErrorMsg('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary to-primary-light flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-primary">Admin Login</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-600 font-medium">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-600 font-medium">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
              <Lock className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="Enter password"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="text-red-600 text-sm text-center">{errorMsg}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
