// src/App.js
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const App = () => {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
};

export default App;
