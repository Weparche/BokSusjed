import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/boksusjed/AppShell';
import { InstallPrompt } from './components/boksusjed/InstallPrompt';
import { ToastContainer } from './components/boksusjed/Toast';
import { CreatePostPage } from './pages/boksusjed/CreatePostPage';
import { DostupanKvartPage } from './pages/boksusjed/DostupanKvartPage';
import { FeedPage } from './pages/boksusjed/FeedPage';
import { HelpPage } from './pages/boksusjed/HelpPage';
import { ImpactPage } from './pages/boksusjed/ImpactPage';
import { MapPage } from './pages/boksusjed/MapPage';
import { OtporanKvartPage } from './pages/boksusjed/OtporanKvartPage';
import { ProfilePage } from './pages/boksusjed/ProfilePage';
import { RecommendationsPage } from './pages/boksusjed/RecommendationsPage';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/boksusjed" replace />} />
        <Route element={<AppShell />}>
          <Route path="/boksusjed" element={<FeedPage />} />
          <Route path="/boksusjed/preporuke" element={<RecommendationsPage />} />
          <Route path="/boksusjed/mapa" element={<MapPage />} />
          <Route path="/boksusjed/pomoc" element={<HelpPage />} />
          <Route path="/boksusjed/objavi" element={<CreatePostPage />} />
          <Route path="/boksusjed/profil" element={<ProfilePage />} />
          <Route path="/boksusjed/otporan-kvart" element={<OtporanKvartPage />} />
          <Route path="/boksusjed/dostupan-kvart" element={<DostupanKvartPage />} />
          <Route path="/boksusjed/impact" element={<ImpactPage />} />
        </Route>
      </Routes>
      <ToastContainer />
      <InstallPrompt />
    </>
  );
}
