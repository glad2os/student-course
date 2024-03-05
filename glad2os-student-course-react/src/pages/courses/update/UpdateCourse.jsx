import {useEffect, useState} from 'react';
import "./UpdateCourse.scss";
import {useParams} from "react-router-dom";
import axios from "axios";

function UpdateCourse() {
    const {id} = useParams();

    const initialFormData = {
        courseCode: '',
        courseName: '',
        section: '',
        semester: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (id) {
            const fetchCourseData = async () => {
                const query = `
                    query GetCourse($id: ID!) {
                        course(id: $id) {
                            id
                            courseCode
                            courseName
                            section
                            semester
                        }
                    }
                `;

                try {
                    const response = await axios.post('http://localhost:4000/graphql', {
                        query,
                        variables: {id},
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.data.data.course) {
                        setFormData({
                            courseCode: response.data.data.course.courseCode,
                            courseName: response.data.data.course.courseName,
                            section: response.data.data.course.section,
                            semester: response.data.data.course.semester,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching course data: ", error);
                }
            };

            fetchCourseData();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mutation = `
            mutation ${id ? 'UpdateCourse' : 'CreateCourse'}($courseData: CourseInput!) {
                ${id ? 'updateCourse' : 'addCourse'}(courseData: $courseData) {
                    id
                }
            }
        `;

        try {
            await axios.post('http://localhost:4000/graphql', {
                query: mutation,
                variables: {
                    courseData: {
                        ...formData,
                    },
                },
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert(`Course ${id ? 'updated' : 'created'} successfully!`);
        } catch (error) {
            console.error("Error submitting course: ", error);
            alert(`Failed to ${id ? 'update' : 'create'} course.`);
        }
    };

    return (
        <div>
            <div className="container update-course-form">
                <h1>{id ? "Update" : "Create"} Course</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange}
                           placeholder="Course Code"/>
                    <input type="text" name="courseName" value={formData.courseName} onChange={handleChange}
                           placeholder="Course Name"/>
                    <input type="text" name="section" value={formData.section} onChange={handleChange}
                           placeholder="Section"/>
                    <input type="text" name="semester" value={formData.semester} onChange={handleChange}
                           placeholder="Semester"/>
                    <button type="submit" className="submit-button">{id ? "Update" : "Create"} Course</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateCourse;
