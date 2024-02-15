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
                            <div className="remove">
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
