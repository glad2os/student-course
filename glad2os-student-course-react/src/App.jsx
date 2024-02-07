import './App.scss'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import CreateCourse from "./components/CreateCourse.jsx";
import ListCourses from "./pages/courses/ListCourses.jsx";
import CreateStudent from "./pages/students/CreateStudent.jsx";
import ListStudents from "./pages/students/ListStudents.jsx";
import Header from "./components/header/Header.jsx";


function App() {
    const conditionToShowLinks = true;

    return (
        <BrowserRouter>
            <Header showLinks={conditionToShowLinks}/>
            <Routes>
                <Route path="/create-course" element={<CreateCourse/>}/>
                <Route path="/courses" element={<ListCourses/>}/>
                <Route path="/create-student" element={<CreateStudent/>}/>
                <Route path="/students" element={<ListStudents/>}/>
            </Routes>
        </BrowserRouter>);
}

export default App
