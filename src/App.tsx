import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ChatHome from "./components/ChatHome";
import Auth from "./components/Auth";
import RoleProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import { checkAuthStart } from "./store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { State } from "./store/store";
import Loading from "./shared/Loading";
import Unauthorized from "./Pages/Unauthorized";
import NotFound from "./Pages/NotFound";
import { loadeUsers } from "./store/slices/usersSlice";
import Chats from "./Pages/Chats";
import Dasboard from "./shared/Dasboard";

function App() {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const loading = useSelector((state: State) => state.auth.isLoading);
  useEffect(() => {
    dispatch(checkAuthStart());
    dispatch(loadeUsers());
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route
          element={<RoleProtectedRoute allowedRoles={["user", "admin"]} />}
        >
          <Route index element={<ChatHome />}></Route>
          <Route path="allChats" element={<Chats />}></Route>
        </Route>

        <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dasboard" element={<Dasboard />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
