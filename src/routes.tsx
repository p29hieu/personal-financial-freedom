import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "calculate",
        // Single route in lazy file
        lazy: () => import("./pages/CalculatePage"),
      },
      {
        path: "synthesize",
        async lazy() {
          // Multiple routes in lazy file
          const { Component, loader } = await import("./pages/SynthesizePage");
          return { Component, loader };
        },
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
