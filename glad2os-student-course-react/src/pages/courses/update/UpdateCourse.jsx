import React, { useEffect, useState } from 'react';
import "./UpdateCourse.scss"; // Assuming you have or will create a corresponding SCSS file for styling
import api from "../../../configs/api.js";
import { useParams } from "react-router-dom";

function UpdateCourse() {
    const { id } = useParams();

    const initialFormData = {
        courseCode: '',
        courseName: '',
        section: '',
        semester: '',
        students: [] // Assuming the course might have an array of student IDs
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        const fetchCourseData = async () => {
            if (id) {
                try {
                    const response = await api.get(`http://localhost:3000/courses/${id}`);
                    const { _id, __v, ...courseFormData } = response.data; // Destructure to exclude _id and __v
                    setFormData(courseFormData);
                } catch (error) {
                    console.error("Error fetching course data: ", error);
                }
            }
        };

        fetchCourseData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (id) {
                response = await api.put(`http://localhost:3000/courses/${id}`, formData);
            } else {
                response = await api.post('http://localhost:3000/courses', formData);
            }
            console.log(response.data);
            alert("Course updated successfully!");
        } catch (error) {
            console.error("Error submitting course: ", error.response);
            alert("Failed to update course.");
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
                    {/* Handling of students array might require a more complex UI component */}
                    <button type="submit" className="submit-button">{id ? "Update" : "Create"} Course</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateCourse;
