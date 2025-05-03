import { Route, Routes } from "react-router-dom";

import AdminProfile from "./pages/admin";
import EthlyFiPage from "./pages/fraude";
import Profile from "./pages/profile";
import TaskList from "./pages/task-list";
import TaskDetailsPage from "./pages/task-page";
import WalletPage from "./pages/wallet";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<EthlyFiPage />} />
      <Route path="/task-list" element={<TaskList />} />
      <Route path="/task-page" element={<TaskDetailsPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/wallet" element={<WalletPage />} />
      <Route path="/admin" element={<AdminProfile />} />

      {/* <Route path="/practices" element={<Practice />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/question-attempt/:id" element={<AttemptQuestion />} />
      <Route path="/question-solution/:id" element={<QuestionSolution />} />
      <Route path="/question-artboard/:id" element={<QuestionArtboard />} /> */}
    </Routes>
  );
};

export default App;
