import PageRouter from './PageRouter';
import StandardLayout from './pages/StandardLayout';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { answersHeadlessConfig } from './config/answersHeadlessConfig';
import { routeConfig } from './config/routeConfig';

export default function App() {
  return (
    <AnswersHeadlessProvider {...answersHeadlessConfig}>
      <div className='flex justify-center px-8 py-6 bg-black text-white'>
        <div className='w-full max-w-7xl'>
          <PageRouter
            Layout={StandardLayout}
            routes={routeConfig}
          />
        </div>
      </div>
    </AnswersHeadlessProvider>
  );
}
