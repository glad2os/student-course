import React, {useEffect, useState} from 'react';
import api from '../../../configs/api.js';
import {Link} from 'react-router-dom';
import "./ListCoures.scss"

function ListCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('http://localhost:3000/courses');
                setCourses(response.data); // Assuming the response data is an array of courses
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
                        <div className="course-info" onClick={() => redirect(course._id)}>
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
