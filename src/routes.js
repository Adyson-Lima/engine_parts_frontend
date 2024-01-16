import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parts from './pages/Parts';
import NewUpdate from './pages/NewUpdate';

export default function PartsRouter(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Parts/>} />
        <Route path="/newupdate/:part_id" element={<NewUpdate/>} />
      </Routes>
    </BrowserRouter>
  );
}