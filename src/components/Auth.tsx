import { memo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Input from "../shared/Input";
import Button from "../shared/Button";
import StarScene from "./StarScene";
// import { connect } from "react-redux";
import { loginStart } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { State } from "../store/store";
import { useNavigate } from "react-router-dom";

interface authProps {}

const Auth: React.FC<authProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state: State) => state.auth.isLoading);
  const isAuthenticated = useSelector(
    (state: State) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  console.log(isLoading);
  const [isLogin, setIsLogin] = useState(true);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fromData = new FormData(e.currentTarget);
    console.log("from data", fromData);
    const data = Object.fromEntries(fromData.entries());
    console.log(data);
    dispatch(loginStart(data));
  };
  return (
    <div className="relative h-[calc(100vh-60px)]">
      {" "}
      <StarScene />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 pointer-events-none">
        <div className="pointer-events-auto w-[500px] p-10  border border-white/10 rounded-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] text-white text-center">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="singup"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex gap-4 flex-col "
              >
                <form
                  onSubmit={handleSubmit}
                  method="POST"
                  className="flex gap-4 flex-col"
                  action=""
                >
                  <Input
                    containerClass="text-start flex flex-col gap-2"
                    children="Fullname"
                    placeholder="Enter your name"
                    type="text"
                    className="border-2 rounded-xl border-white w-full"
                    name="name"
                  />

                  <Input
                    containerClass="text-start flex flex-col gap-2"
                    children="UserName"
                    placeholder="Enter your userName"
                    type="text"
                    className="border-2 rounded-xl border-white w-full"
                    name="username"
                  />
                  <Input
                    containerClass="text-start flex flex-col gap-2"
                    children="Email"
                    placeholder="Enter your Email"
                    type="email"
                    className="border-2 rounded-xl border-white w-full"
                    name="email"
                  />

                  <Input
                    containerClass="text-start flex flex-col gap-2"
                    children="Phone Number"
                    placeholder="Enter your phone number"
                    type="number"
                    name="phoneNumber"
                    className="border-2 rounded-xl border-white w-full"
                  />

                  <Input
                    containerClass="text-start flex flex-col gap-2"
                    children="Password"
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    className="border-2 rounded-xl border-white w-full"
                  />
                  <div className="w-full flex items-start gap-4">
                    <Input
                      containerClass=" flex gap-2 justify-center items-center"
                      type="radio"
                      name="gender"
                      value="male"
                      children="Male"
                    />
                    <Input
                      containerClass=" flex gap-2 justify-center items-center"
                      type="radio"
                      name="gender"
                      value="female"
                      children="Female"
                    />
                  </div>

                  <Button className="bg-sky-600" type="primary">
                    {isLoading ? "Loading..." : "Submit"}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex gap-4 flex-col"
              >
                {" "}
                <form
                  onSubmit={handleSubmit}
                  method="POST"
                  className="flex gap-4 flex-col"
                  action=""
                >
                  <Input
                    containerClass="text-start flex flex-col gap-2"
                    children="Email/UserName"
                    placeholder="Enter your userName/email"
                    type="text"
                    className="border-2 rounded-xl border-white w-full"
                    name="userNameOrEmail"
                  />

                  <Input
                    containerClass="text-start flex flex-col gap-2"
                    children="Password"
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    className="border-2 rounded-xl border-white w-full"
                  />

                  <Button className="bg-sky-600" type="primary">
                    Submit
                  </Button>
                </form>
              </motion.div>
            )}

            <p>
              You {isLogin ? "don't have" : "have"} a acount please{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-sky-400 font-bold cursor-pointer hover:underline"
              >
                {isLogin ? "login" : "Signup"}
              </span>
            </p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


export default memo(Auth);
