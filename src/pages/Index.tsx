
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to welcome page after 1 second
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c1e3e] to-[#4c2a85]">
      <div className="text-white text-2xl animate-pulse">Loading...</div>
    </div>
  );
};

export default Index;
