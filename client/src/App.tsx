import { Routes, Route } from "react-router-dom";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import HomePage from "./pages/BlogsPage/BlogsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Protected from "./components/Protected";
import BlogSetting from "./pages/BlogSetting/BlogSetting";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import UserSetting from "./pages/UserSetting/UserSetting";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>

      <Route element={<Protected />}>
        <Route path="/new" element={<Dashboard />}></Route>
        <Route path="/blog-setting/:postId" element={<BlogSetting />} />
        <Route path="/blog/:postId" element={<BlogDetail />}></Route>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/settings" element={<UserSetting />} />
      </Route>
    </Routes>
  );
};

export default App;
