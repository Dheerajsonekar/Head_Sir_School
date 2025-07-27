// components/CookieDebugger.tsx - Add this temporarily to debug
"use client";

import { useEffect, useState } from 'react';
import api from '@/utils/axios';

const CookieDebugger = () => {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const debug = async () => {
      try {
        // 1. Check document.cookie on client
        const clientCookies = document.cookie;
        
        // 2. Make API call to verify endpoint
        let apiResponse = null;
        try {
          const response = await api.get('/auth/verify');
          apiResponse = response.data;
        } catch (error: any) {
          apiResponse = { error: error.message, status: error.response?.status };
        }

        // 3. Check current URL and environment
        const currentUrl = window.location.href;
        const isLocalhost = currentUrl.includes('localhost');
        
        setDebugInfo({
          // Client-side info
          clientCookies,
          currentUrl,
          isLocalhost,
          
          // API response
          apiResponse,
          
          // Environment variables (client-side only)
          backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
          
          // Browser info
          userAgent: navigator.userAgent,
          
          // Axios config
          axiosConfig: {
            baseURL: api.defaults.baseURL,
            withCredentials: api.defaults.withCredentials,
            timeout: api.defaults.timeout,
          }
        });
      } catch (error: any) {
        setDebugInfo({ error: error.message });
      }
    };

    debug();
  }, []);

  return (
    <div className="fixed top-0 right-0 w-96 h-screen bg-black text-green-400 p-4 text-xs overflow-auto z-50 font-mono">
      <h3 className="text-yellow-400 font-bold mb-2">🐛 AUTH DEBUG INFO</h3>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      
      {/* Quick Test Buttons */}
      <div className="mt-4 space-y-2">
        <button 
          onClick={() => {
            api.get('/auth/verify').then(res => {
              console.log('✅ API Test Success:', res.data);
              alert('API Test Success - Check Console');
            }).catch(err => {
              console.log('❌ API Test Failed:', err);
              alert('API Test Failed - Check Console');
            });
          }}
          className="bg-blue-600 text-white px-2 py-1 rounded text-xs block w-full"
        >
          Test API Call
        </button>
        
        <button 
          onClick={() => {
            console.log('📋 Current Cookies:', document.cookie);
            console.log('📋 LocalStorage:', localStorage);
            console.log('📋 SessionStorage:', sessionStorage);
          }}
          className="bg-green-600 text-white px-2 py-1 rounded text-xs block w-full"
        >
          Log All Storage
        </button>
        
        <button 
          onClick={() => {
            // Clear everything
            document.cookie.split(";").forEach(c => {
              const eqPos = c.indexOf("=");
              const name = eqPos > -1 ? c.substr(0, eqPos) : c;
              document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            });
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
          }}
          className="bg-red-600 text-white px-2 py-1 rounded text-xs block w-full"
        >
          Clear All & Reload
        </button>
      </div>
    </div>
  );
};

export default CookieDebugger;