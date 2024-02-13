import './App.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ListCourses from "./pages/courses/ListCourses.jsx";
import CreateStudent from "./pages/students/create/CreateStudent.jsx";
import ListStudents from "./pages/students/list/ListStudents.jsx";
import Header from "./components/header/Header.jsx";
import HomePage from "./pages/home/HomePage.jsx";

function App() {
    const conditionToShowLinks = true;

    return (
        <BrowserRouter>
            <Header showLinks={conditionToShowLinks}/>
            <Routes>
                <Route index element={<HomePage/>}/> {}
                <Route path="/courses" element={<ListCourses/>}/>
                <Route path="/create-student" element={<CreateStudent/>}/>
                <Route path="/students" element={<ListStudents/>}/>
            </Routes>
        </BrowserRouter>);
}

export default App
