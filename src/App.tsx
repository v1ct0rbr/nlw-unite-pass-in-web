import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from "./components/theme-provider";
import { queryClient } from './lib/react-query'
import { Toaster } from "sonner";
import {QueryClientProvider} from '@tanstack/react-query'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
    <ThemeProvider defaultTheme="dark" storageKey="nlw-pass-in-web">
    <Helmet titleTemplate="%s | NLW - Unite"></Helmet>
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
      </HelmetProvider>

  );
}
