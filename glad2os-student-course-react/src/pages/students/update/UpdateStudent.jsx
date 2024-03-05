import {useEffect, useState} from 'react';
import "./UpdateStudent.scss"
import api from "../../../configs/api.js";
import {useParams} from "react-router-dom";

function UpdateStudent() {
    const {id} = useParams();

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
            if (id) {
                const query = `
            query GetStudent($id: ID!) {
              findStudentById(studentId: $id) {
                studentNumber
                password
                firstName
                lastName
                address
                city
                phoneNumber
                email
                program
                favoriteTopic
                strongestSkill
              }
            }
        `;

                try {
                    const response = await api.post('/graphql', {
                        query,
                        variables: {id},
                    });

                    if (response.data.data.findStudentById) {
                        setFormData(response.data.data.findStudentById);
                    }
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

        const mutation = id ? `
        mutation UpdateStudent($id: ID!, $studentData: StudentInput!) {
          updateStudentById(studentId: $id, studentData: $studentData) {
            id
          }
        }
    ` : `
        mutation AddStudent($studentData: StudentInput!) {
          addStudent(studentData: $studentData) {
            id
          }
        }
    `;

        try {
            const variables = id ? {id, studentData: formData} : {studentData: formData};
            const response = await api.post('/graphql', {
                query: mutation,
                variables,
            });

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