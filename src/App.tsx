import './styles/index.scss';
import 'rsuite/dist/rsuite.min.css';

import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

import IndexPage from './pages/Index';
import DetailPage from './pages/Detail';
import AuthPage from './pages/Auth';

const queryClient = new QueryClient();

const USER = 'user';

function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/detail/:name" element={<DetailPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default Index;
