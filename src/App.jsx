import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { useState } from "react";
import Nav from "./components/Nav";
import RoomItem from "./components/RoomItem";
import Hero from "./sections/Hero";
import Login from "./sections/Login";
import Modal from "./sections/Modal";
import RoomShower from "./sections/RoomShower";
import CodeEditor from "./components/CodeEditor"

export default function App() {

  const[showModal,setshowModal]=useState(false);
  // pass login as child to buttons
  // at present the moda has only sign  up inputs and

  return (
    // <main className="">
    //   <Nav setshowModal={setshowModal}></Nav>

      // <section>
      //   <Hero setshowModal={setshowModal}></Hero>
      // </section>

      // <section>
      //   <RoomShower></RoomShower>
      // </section>

      

    // <section>
    //   <Modal isVisible={showModal} setshowModal={setshowModal}><Login></Login></Modal>
    // </section>
      
    // </main>
    <>

    <Routes>

      
    <Route exact path='/' element={
    <>
      <Nav setshowModal={setshowModal}></Nav>
      <section>
          <Hero setshowModal={setshowModal}></Hero>
      </section>      
      <section>
          <RoomShower></RoomShower>
      </section>
    </>}/>

    <Route exact path='/code' element={
      <CodeEditor />
    }/>


    </Routes>

    <section>
      <Modal isVisible={showModal} setshowModal={setshowModal}><Login></Login></Modal>
    </section>
    </>
    
  )
}