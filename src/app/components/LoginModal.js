import React, { useState } from 'react';
import '@/styles/globals.css';

const LoginModal = ({ email, styles= {} }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Add your login logic here
      await new Promise(resolve => setTimeout(resolve, 1000000));
    } catch (err) {
      setError('Invalid password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add animation styles to the outer div
  const modalStyles = {
    ...styles.modalContainer,
    animation: 'modalFadeIn 0.3s ease-out forwards',
  };

  return (
    <>
      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -48%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          padding: '2.5rem',
          width: '448px',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px, rgba(0, 0, 0, 0.05) 0px 5px 20px',
          position: 'relative',
          zIndex: 1001,
          animation: 'modalFadeIn 0.3s ease-out',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Logo Section */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 600, 
              color: '#1F2937',
              marginBottom: '0.5rem',
              letterSpacing: '-0.025em'
            }}>Welcome back</h1>
            <div style={{ 
              marginTop: '0.5rem', 
              color: '#6B7280',
              fontSize: '1.1rem'
            }}>{email}</div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Email Field (Disabled) */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.9rem', 
                fontWeight: 500, 
                color: '#374151',
                marginBottom: '0.5rem',
                letterSpacing: '0.025em'
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #B8C2CC',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(240, 240, 240, 0.7)',
                  color: '#6B7280',
                  cursor: 'not-allowed',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.9rem', 
                fontWeight: 500, 
                color: '#374151',
                marginBottom: '0.5rem',
                letterSpacing: '0.025em'
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.75rem',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  color: '#111827'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3B82F6';
                  e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div style={{ 
                color: '#EF4444', 
                fontSize: '0.9rem',
                backgroundColor: '#FEF2F2',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 6v4m0 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {error}
              </div>
            )}

            {/* Forgot Password Link */}
            {/* <div style={{ textAlign: 'right' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '0.9rem',
                  color: '#3B82F6',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#2563EB'}
                onMouseOut={(e) => e.target.style.color = '#3B82F6'}
              >
                Forgot password?
              </a>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.875rem 1.5rem',
                borderRadius: '0.75rem',
                color: 'white',
                fontWeight: 600,
                backgroundColor: isLoading ? '#4B5563' : '#111827',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                border: 'none',
                fontSize: '1rem',
                transform: isLoading ? 'none' : 'translateY(0)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#374151';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(17, 24, 39, 0.25)';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#111827';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <svg
                    style={{
                      animation: 'spin 1s linear infinite',
                      width: '1.25rem',
                      height: '1.25rem'
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      style={{ opacity: 0.25 }}
                    ></circle>
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      style={{ opacity: 0.75 }}
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Additional Options */}
          {/* <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button 
              style={{
                fontSize: '0.9rem',
                color: '#6B7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#374151';
                e.target.style.backgroundColor = '#F3F4F6';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#6B7280';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Sign in with a different account
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LoginModal;