import logo from './logo.svg';
import './App.css';
import RoomItem from './components/RoomItem';

function App() {

  const roomid1 = "fzey34br";
  const roomid2 = "het2uj2f";
  const roomname1 = "Test room 1";
  const roomname2 = "Test room 2";

  return (
    <div className="App">
      <div className="container">
      <RoomItem roomid={roomid1} roomname={roomname1}/>
      <RoomItem roomid={roomid2} roomname={roomname2} />
      </div>
    </div>
  );
}

export default App;
