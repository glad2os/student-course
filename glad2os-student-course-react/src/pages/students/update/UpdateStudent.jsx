// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import "./UpdateStudent.scss"
import api from "../../../configs/api.js";
import {useParams} from "react-router-dom";

function UpdateStudent() {
    const { id } = useParams();

    const initialFormData = {
        studentNumber: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        phoneNumber: '',
        email: '',
        program: '',
        favoriteTopic: '',
        strongestSkill: '',
    };


    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        const fetchStudentData = async () => {
            if (id) { // Check if "id" is not null or undefined
                try {
                    const axiosResponse = await api.get(`http://localhost:3000/students/${id}`);
                    // eslint-disable-next-line no-unused-vars
                    const { _id, __v, ...studentFormData } = axiosResponse.data; // Destructure to exclude _id and __v
                    setFormData(studentFormData);
                } catch (error) {
                    console.error("Error fetching student data: ", error);
                }
            }
        };

        fetchStudentData();
    }, [id]);



    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (id) {
                response = await api.put(`http://localhost:3000/students/${id}`, formData);
            } else {
                response = await api.post('http://localhost:3000/students', formData);
            }
            console.log(response.data);
            alert("Done");
        } catch (error) {
            console.error("Error submitting form: ", error.response);
        }
    };

    return (
        <div>
            <div className="create-student-form">
                <h1>{id ? "Update" : "Create"} Student</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="studentNumber" value={formData.studentNumber} onChange={handleChange}
                           placeholder="Student Number"/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}
                           placeholder="Password"/>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                           placeholder="First Name"/>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                           placeholder="Last Name"/>
                    <input type="text" name="address" value={formData.address} onChange={handleChange}
                           placeholder="Address"/>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City"/>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                           placeholder="Phone Number"/>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                           placeholder="Email"/>
                    <input type="text" name="program" value={formData.program} onChange={handleChange}
                           placeholder="Program"/>
                    <input type="text" name="favoriteTopic" value={formData.favoriteTopic} onChange={handleChange}
                           placeholder="Favorite Topic"/>
                    <input type="text" name="strongestSkill" value={formData.strongestSkill} onChange={handleChange}
                           placeholder="Strongest Skill"/>
                    <button type="submit" className="submit-button">{id ? "Update" : "Create"} Student</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;