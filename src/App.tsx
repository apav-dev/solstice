import PageRouter from './PageRouter';
import StandardLayout from './pages/StandardLayout';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { answersHeadlessConfig } from './config/answersHeadlessConfig';
import { routeConfig } from './config/routeConfig';
import { useEffect, useState, createContext } from 'react';

export const ResponsiveContext = createContext(false);

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setIsMobile(width < 1024);
  };

  return (
    <ResponsiveContext.Provider value={isMobile}>
      <div
        // TODO: need better way to do this
        style={{ margin: 0, padding: 0, minHeight: '100vh', minWidth: '100vh', backgroundColor: 'black' }}>
        <AnswersHeadlessProvider {...answersHeadlessConfig}>
          <div className="flex w-full justify-center bg-black px-8 py-6 text-white">
            <div className="w-full max-w-7xl sm:max-w-full">
              <PageRouter Layout={StandardLayout} routes={routeConfig} />
            </div>
          </div>
        </AnswersHeadlessProvider>
      </div>
    </ResponsiveContext.Provider>
  );
}
