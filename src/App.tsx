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
      <AnswersHeadlessProvider {...answersHeadlessConfig}>
        <PageRouter Layout={StandardLayout} routes={routeConfig} />
      </AnswersHeadlessProvider>
    </ResponsiveContext.Provider>
  );
}
