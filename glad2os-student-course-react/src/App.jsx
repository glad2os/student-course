import './App.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ListCourses from "./pages/courses/list/ListCourses.jsx";
import UpdateStudent from "./pages/students/update/UpdateStudent.jsx";
import ListStudents from "./pages/students/list/ListStudents.jsx";
import Header from "./components/header/Header.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import UpdateCourse from "./pages/courses/update/UpdateCourse.jsx";

function App() {
    const conditionToShowLinks = true;

    return (
        <BrowserRouter>
            <Header showLinks={conditionToShowLinks}/>
            <Routes>
                <Route index element={<HomePage/>}/> {}

                <Route path="/courses/" element={<ListCourses/>}/>
                <Route path="/students" element={<ListStudents/>}/>

                <Route path="/create-course" element={<UpdateCourse/>}/>
                <Route path="/create-student" element={<UpdateStudent/>}/>

                <Route path="/student/:id" element={<UpdateStudent/>}/>
                <Route path="/courses/:id" element={<UpdateCourse/>}/>
            </Routes>
        </BrowserRouter>);
}

export default App
