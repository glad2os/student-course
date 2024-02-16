import {useEffect, useState} from 'react';
import api from '../../../configs/api.js';
import {Link} from 'react-router-dom';
import "./ListCoures.scss"

function ListCourses() {
    const [courses, setCourses] = useState([]);

    const {BACKEND_HOST} = process.env;


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                let url = BACKEND_HOST ? `${BACKEND_HOST}/courses` : 'http://localhost:3000/courses';
                const response = await api.get(url);
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
        };

        fetchCourses().then(() => {
        });
    }, []);

    async function removeRequest(_id) {
        try {
            let axiosResponse = await api.delete(`http://localhost:3000/courses/${_id}`);

            if (axiosResponse.status === 200) {
                alert("Student deleted successfully!");

                const updatedStudents = courses.filter(student => student._id !== _id);
                setCourses(updatedStudents);
            } else {
                alert("Failed to delete the student.");
            }
        } catch (error) {
            console.error("Error deleting student: ", error);
            alert("An error occurred while trying to delete the student.");
        }
    }

    const redirect = (id) => {
        return window.location.href = `/courses/${id}`;
    }

    return (
        <div className="container course-list">
            <h1>Courses</h1>
            <ul>
                <li className="course add-new">
                    <Link to="/create-course" className="course-add-link">
                        <div className="course-info">
                            <p className="add-course-text">+</p>
                        </div>
                    </Link>
                </li>
                {courses.map(course => (
                    <li key={course._id} className="course">
                        <div className="course-info">
                            <p>Course Code: <span>{course.courseCode}</span></p>
                            <p>Course Name: <span>{course.courseName}</span></p>
                            <p>Section: <span>{course.section}</span></p>
                            <p>Semester: <span>{course.semester}</span></p>
                        </div>
                        <div className="toolbox">
                            <hr/>
                            <div className="remove" onClick={() => removeRequest(course._id)}>
                                Delete
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListCourses;
