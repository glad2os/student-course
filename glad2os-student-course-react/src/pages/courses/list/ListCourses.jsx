import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import "./ListCoures.scss"
import axios from "axios";

function ListCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const query = `
                query {
                    listAllCourses {
                        id
                        courseCode
                        courseName
                        section
                        semester
                    }
                }
            `;

            try {
                const response = await axios({
                    url: 'http://localhost:4000/graphql', method: 'POST', data: JSON.stringify({query}), headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data.data.listAllCourses) {
                    setCourses(response.data.data.listAllCourses);
                }
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
        };

        fetchCourses();
    }, []);

    async function removeCourse(courseId) {
        const mutation = `
            mutation {
                dropCourse(courseId: "${courseId}") {
                    id
                }
            }
        `;

        try {
            const response = await axios({
                url: 'http://localhost:4000/graphql',
                method: 'POST',
                data: JSON.stringify({query: mutation}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.data.dropCourse) {
                alert("Course deleted successfully!");
                setCourses(courses.filter(course => course.id !== courseId));
            } else {
                alert("Failed to delete the course.");
            }
        } catch (error) {
            console.error("Error deleting course: ", error);
            alert("An error occurred while trying to delete the course.");
        }
    }

    return (<div className="container course-list">
            <h1>Courses</h1>
            <ul>
                <li className="course add-new">
                    <Link to="/create-course" className="course-add-link">
                        <div className="course-info">
                            <p className="add-course-text">+</p>
                        </div>
                    </Link>
                </li>
                {courses.map(course => {
                    return (<li key={course.id} className="course">
                            <div className="course-info">
                                <p>courseCode: <span>{course.courseCode}</span></p>
                                <p>courseName: <span>{course.courseName}</span></p>
                                <p>section: <span>{course.section}</span></p>
                                <p>semester: <span>{course.semester}</span></p>
                            </div>
                            <div className="toolbox">
                                <hr/>
                                <div className="remove" onClick={() => removeCourse(course.id)}>
                                    Delete
                                </div>
                            </div>
                        </li>)
                })}
            </ul>
        </div>);
}

export default ListCourses;
