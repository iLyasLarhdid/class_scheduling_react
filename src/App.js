import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import Main from "./navbar/main";
import Group from "./group";
import Module from "./module";
import Room from "./room";
import Period from "./period";
import Professor from './professor';
import Schedule from "./schedule";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        //other query settings
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <SnackbarProvider maxSnack={2}>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>  
      <Routes>
        <Route exact path="/" element={<Navbar body={<Main/>}/>}/>
        <Route exact path="/rooms" element={<Navbar body={<Room/>}/>}/>
        <Route exact path="/modules" element={<Navbar body={<Module/>}/>}/>
        <Route exact path="/periods" element={<Navbar body={<Period/>}/>}/>
        <Route exact path="/professors" element={<Navbar body={<Professor/>}/>}/>
        <Route exact path="/groups" element={<Navbar body={<Group/>}/>}/>
        <Route exact path="/schedule" element={<Navbar body={<Schedule/>}/>}/>
      </Routes>
    </QueryClientProvider>
    </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
