
import EmployeeComponent from './components/EmployeeComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeComponent from './components/ListEmployeComponent'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App(){
  return(
    <Router>
      <div className="app-root">
        <HeaderComponent />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<ListEmployeComponent />} />
            <Route path="/employees" element={<ListEmployeComponent/>}/>
            <Route path="/add-employee" element = {<EmployeeComponent/>}/>
            {/*http://localhost:3000/edit-employee/1 */}
            <Route path='/edit-employee/:id' element= {<EmployeeComponent/>}/>
          </Routes>
        </main>
        <FooterComponent/>
      </div>
    </Router>
    
    
    
    
  )
};
export default App;