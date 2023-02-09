// import React from 'react';
// // @ts-ignore
// import style from './app.module.scss'
// import { TodoList } from './Todo/TodoList/TodoList';
// import { Watch } from './Todo/Watch/Watch';
// import { Count } from './Todo/Count/Count';
// import { WelCome } from './Todo/Context/WelCome';
// import ProductList from './useDeferredValue/Index'
// import { MainLayout } from './CreatePortal/MainLayout';
// import { Manager } from './CreatePortal/Manager';
// import {MouseTracker } from './RenderProps/MouseTracker'
// import { Ads } from './RenderProps/Ads';
// import { User } from './User/User';
// import {Blog} from './Redux2/Blog'
import { BlogList } from "./RTKQuery/BlogList";
import Students from "./React-Query/pages/Students/Students";
import Dashboard from "./React-Query/pages/Dashboard/Dashboard";
import { About } from "./React-Query/pages/About/About";
import AddStudent from "./React-Query/pages/AddStudent/AddStudent";
import { NotFound } from "./React-Query/pages/NotFound/NotFound";
import { useRoutes } from "react-router-dom";
import MainLayout from "./React-Query/layouts/MainLayout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "./Component/Spinner";
import { useIsFetching, useIsMutating } from "react-query";

// Kiểm tra xem cái app có cái nào đang fetching hoặc mutation

function App() {
  // <div className="App">
  //   {/* <TodoList /> */}
  //   {/* <Watch /> */}
  //   {/* <Count/> */}
  //   {/* <WelCome /> */}
  //   {/* <ProductList /> */}
  //   {/* <MainLayout>
  //     <Manager />
  //   </MainLayout> */}
  //   {/* <MouseTracker render={(value)=> <Ads position={value} />} /> */}
  //   {/* <User /> */}
  //   <BlogList />
  // </div>

  
  const elements = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/students",
      element: <Students />,
    },
    {
      path: "/students/:id",
      element: <AddStudent />,
    },
    {
      path: "/students/add",
      element: <AddStudent />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <div className="App">
      <ToastContainer />
      {isFetching + isMutating !== 0 && <Spinner />}
      <MainLayout>{elements}</MainLayout>
    </div>
  );
}

export default App;
