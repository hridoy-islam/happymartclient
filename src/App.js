import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import {Toaster} from 'react-hot-toast'
import { 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster />
      </QueryClientProvider>
    </div>
  );
}

export default App;
