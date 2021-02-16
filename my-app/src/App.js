import './App.css';
import Header from './components/Header'
import MainForm from './components/MainForm';
import DynamicForm from './components/DynamicForm'

function App() {
  return (
    <div>
      <Header ></Header>
      <DynamicForm/>
      <MainForm></MainForm>
    </div>
  );
}

export default App;
