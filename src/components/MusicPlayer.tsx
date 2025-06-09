'use client';

import { useMusicContext } from '@/context/MusicContext';

const MusicPlayer = () => {
  const { isPlaying, togglePlay, rotation } = useMusicContext();

  return (
    <div className="fixed bottom-8 right-8 flex items-center gap-2">
      <button
        onClick={togglePlay}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors relative group"
      >
        {/* Music Note Icon (always visible) */}
        <div 
          className="absolute transition-opacity opacity-50 group-hover:opacity-0"
          style={{ 
            width: '1.5rem',
            height: '1.5rem',
            transform: `rotate(${rotation}deg)`,
            willChange: 'transform'
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="white" 
            className="w-full h-full"
          >
            <path d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" />
          </svg>
        </div>

        {/* Play/Pause Icon */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default MusicPlayer; 