import {useEffect, useState} from 'react';
import "./Studentlist.scss";
import {Link} from "react-router-dom";
import graphqlAPI from "../../../configs/api.js";

const ListStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const query = `
                query {
                    listAllStudents {
                        id
                        studentNumber
                        firstName
                        lastName
                        program
                    }
                }
            `;

            try {
                const response = await graphqlAPI.post('', JSON.stringify({query}));
                if (response.data.data.listAllStudents) {
                    setStudents(response.data.data.listAllStudents);
                }
            } catch (error) {
                console.error("Error fetching students: ", error);
            }
        };


        fetchStudents().then(() => {
        });
    }, []);

    const redirect = (id) => {
        return window.location.href = `/student/${id}`;
    }

    async function removeRequest(id) {
        const mutation = `
            mutation {
                deleteStudentById(studentId: "${id}") {
                    id
                }
            }
        `;

        try {
            const response = await graphqlAPI.post('', JSON.stringify({query: mutation}));
            if (response.data.data.deleteStudentById) {
                alert("Student deleted successfully!");
                const updatedStudents = students.filter(student => student.id !== id);
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
                    <li key={student.id} className="student">
                        <div className="student-info" onClick={() => redirect(student.id)}>
                            <p>Student Number: <span>{student.studentNumber}</span></p>
                            <p>Name: <span>{student.firstName} {student.lastName}</span></p>
                            <p>Program: <span>{student.program}</span></p>
                        </div>
                        <div className="toolbox">
                            <hr/>
                            <div className="remove" onClick={() => removeRequest(student.id)}>
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
