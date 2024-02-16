import React, {useEffect, useState} from 'react';
import api from '../../../configs/api.js';
import "./Studentlist.scss";
import {Link} from "react-router-dom";

const ListStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('http://localhost:3000/students');
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchStudents().then(() => {
        });
    }, []);

    const redirect = (id) => {
        return window.location.href = `/student/${id}`;
    }

    async function removeRequest(_id) {
        try {
            let axiosResponse = await api.delete(`http://localhost:3000/students/${_id}`);

            if (axiosResponse.status === 200) {
                alert("Student deleted successfully!");

                const updatedStudents = students.filter(student => student._id !== _id);
                setStudents(updatedStudents);
            } else {
                alert("Failed to delete the student.");
            }
        } catch (error) {
            console.error("Error deleting student: ", error);
            alert("An error occurred while trying to delete the student.");
        }
    }

    return (
        <div className="container student-list">
            <h1>Students</h1>
            <ul>
                <li className="student add-new">
                    <Link to="/create-student" className="student-add-link">
                        <div className="student-info">
                            <p className="add-student-text">+</p>
                        </div>
                    </Link>
                </li>
                {students.map(student => (
                    <li key={student._id} className="student">
                        <div className="student-info" onClick={() => redirect(student._id)}>
                            <p>Student Number: <span>{student.studentNumber}</span></p>
                            <p>Name: <span>{student.firstName} {student.lastName}</span></p>
                            <p>Program: <span>{student.program}</span></p>
                        </div>
                        <div className="toolbox">
                            <hr/>
                            <div className="remove" onClick={() => removeRequest(student._id)}>
                                Delete
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default ListStudents;
