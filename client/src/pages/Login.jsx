import { Lock, Mail, User2Icon } from 'lucide-react';
import React from 'react';
import { useText } from '../hooks/useText';

const Login = () => {
  const t = useText("auth");

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = React.useState(urlState || "login");

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray50">
        <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
          <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? t.loginTitle : t.registerTitle}</h1>
          <p className="text-gray-500 text-sm mt-2">{state === "login" ? t.loginDesc : t.registerDesc}</p>
          {state !== "login" && (
            <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <User2Icon size={16} color='#6B7280' />
              <input type="text" name="name" placeholder={t.name} className="border-none outline-none ring-0" value={formData.name} onChange={handleChange} required />
            </div>
          )}

          <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Mail size={16} color='#6B7280' />
            <input type="email" name="email" placeholder={t.email} className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Lock size={16} color='#6B7280' />
            <input type="password" name="password" placeholder={t.password} className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="mt-4 text-left text-green-500">
            <button className="text-sm" type="reset">{t.forgotPassword}</button>
          </div>

          <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity">
            {state === "login" ? t.loginBtn : t.registerBtn}
          </button>
          <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? t.noAccount : t.hasAccount} <a href="#" className="text-green-500 hover:underline">{t.clickHere}</a></p>
        </form>
      </div>
    </>
  )
}

export default Login;