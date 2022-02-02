import PageRouter from './PageRouter';
import StandardLayout from './pages/StandardLayout';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { answersHeadlessConfig } from './config/answersHeadlessConfig';
import { routeConfig } from './config/routeConfig';
import { useEffect, useState, createContext } from 'react';

export type ScreenSize = 'sm' | 'md' | 'lg' | 'xl';

export const ResponsiveContext = createContext<ScreenSize>('xl');

export default function App() {
  const [screenSize, setScreenSize] = useState<ScreenSize>('xl');

  useEffect(() => {
    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.outerWidth;
    if (width <= 640) {
      setScreenSize('sm');
    } else if (width > 640 && width <= 768) {
      setScreenSize('md');
    } else if (width > 768 && width <= 1024) {
      setScreenSize('lg');
    } else if (width > 1024) {
      setScreenSize('lg');
    }
  };

  return (
    // <div style={{ minWidth: '100vh', backgroundColor: 'black' }}>
    <AnswersHeadlessProvider {...answersHeadlessConfig}>
      <div className="flex justify-center bg-black px-2 py-6 text-white sm:px-8">
        <div className="w-full">
          <ResponsiveContext.Provider value={screenSize}>
            <PageRouter Layout={StandardLayout} routes={routeConfig} />
          </ResponsiveContext.Provider>
        </div>
      </div>
    </AnswersHeadlessProvider>
    // </div>
  );
}
