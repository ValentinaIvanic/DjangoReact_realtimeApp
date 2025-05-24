import React from "react"
import { Route, Routes} from "react-router-dom"
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Polls from "./pages/Polls"
import AddPoll from "./pages/AddPoll";

function App() {

    return (
      <div className="flex flex-col h-screen max-w-screen w-screen">
        <NavBar/>
        <div>
          <Routes>
            <Route path = "/" element={<Home />}/>
            <Route path = "/polls" element={<Polls />}/>
            <Route path = "/addPoll" element={<AddPoll />}/>
          </Routes>
        </div>
      </div>
    );
}

export default App;
