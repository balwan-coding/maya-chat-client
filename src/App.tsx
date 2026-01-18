import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { checkAuthStart } from "./store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { State } from "./store/store";
import Loading from "./shared/Loading";
// import { loadeUsers } from "./store/slices/usersSlice";

function App() {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const loading = useSelector((state: State) => state.auth.isLoading);
  useEffect(() => {
    dispatch(checkAuthStart());
    // dispatch(loadeUsers());
  }, []);

  const Header = lazy(() => import("./components/Header"));
  const Auth = lazy(() => import("./components/Auth"));
  const Unauthorized = lazy(() => import("./Pages/Unauthorized"));
  const ChatHome = lazy(() => import("./components/ChatHome"));
  const Users = lazy(() => import("./Pages/Users"));
  const Dasboard = lazy(() => import("./shared/Dasboard"));
  const NotFound = lazy(() => import("./Pages/NotFound"));
  const RoleProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));

  if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full h-full">
        <Header />

        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/unauthorized" element={<Unauthorized />}></Route>
          <Route
            element={<RoleProtectedRoute allowedRoles={["user", "admin"]} />}
          >
            <Route index element={<ChatHome />}></Route>
            <Route path="/allUsers" element={<Users />}></Route>
          </Route>

          <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/dasboard" element={<Dasboard />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
