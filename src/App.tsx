import { Route, Routes } from "react-router-dom";

import AdminProfile from "./pages/admin";
import EthlyFiPage from "./pages/fraude";
import Profile from "./pages/profile";
import TaskList from "./pages/task-list";
import TaskDetailsPage from "./pages/task-page";
import WalletPage from "./pages/wallet";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import Forgot from "./pages/auth/forgot";
import PasswordReset from "./pages/auth/password-reset";
import SetNewPassword from "./pages/auth/new-password";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/set-newpassword" element={<SetNewPassword />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<EthlyFiPage />} />
      <Route path="/task-list" element={<TaskList />} />
      <Route path="/task-page" element={<TaskDetailsPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/wallet" element={<WalletPage />} />
      <Route path="/admin" element={<AdminProfile />} />
      <Route path="/admin" element={<AdminProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* <Route path="/practices" element={<Practice />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/question-attempt/:id" element={<AttemptQuestion />} />
      <Route path="/question-solution/:id" element={<QuestionSolution />} />
      <Route path="/question-artboard/:id" element={<QuestionArtboard />} /> */}
    </Routes>
  );
};

export default App;
