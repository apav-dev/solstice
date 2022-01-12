import PageRouter from './PageRouter';
import StandardLayout from './pages/StandardLayout';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { answersHeadlessConfig } from './config/answersHeadlessConfig';
import { routeConfig } from './config/routeConfig';

export default function App() {
  return (
    <div 
      // TODO: need better way to do this
      style={{  margin: 0, padding: 0, minHeight: '100vh', backgroundColor: 'black' }}>
      <AnswersHeadlessProvider {...answersHeadlessConfig}>
        <div className='flex justify-center px-8 py-6 bg-black text-white'  >
          <div className='w-full max-w-7xl' >
            <PageRouter
              Layout={StandardLayout}
              routes={routeConfig}
            />
          </div>
        </div>
      </AnswersHeadlessProvider>
    </div>
  );
}
