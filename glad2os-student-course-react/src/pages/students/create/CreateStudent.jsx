import React, {useState} from 'react';
import axios from 'axios';
import "./CreateStudent.scss"

function CreateStudent() {
    const [formData, setFormData] = useState({
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
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/students', formData);
            console.log(response.data);
            alert("Done");
        } catch (error) {
            console.error("Error creating student: ", error.response);
        }
    };

    return (
        <div>
            <div className="create-student-form">

                <h1>Create Student</h1>
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
                    <button type="submit" className="submit-button">Create Student</button>
                </form>
            </div>
        </div>
    );
}

export default CreateStudent;