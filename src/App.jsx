import { Routes, Route, Navigate } from 'react-router-dom';
import PlannerPage from './pages/PlannerPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/plan" replace />} />
      {/* /plan with no session id falls back to the bundled example trip --
          handy for local dev and for judges opening the app cold. */}
      <Route path="/plan" element={<PlannerPage />} />
      <Route path="/plan/:sessionId" element={<PlannerPage />} />
    </Routes>
  );
}
