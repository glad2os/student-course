import React, { useEffect, useState } from 'react';
import api from '../../configs/api.js';

const ListStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('http://localhost:3000/students');
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                // Handle error response (e.g., display an error message)
            }
        };

        fetchStudents().then(r => {
            console.log(r)
        });
    }, []);

    return (
        <div>
            <h1>Students</h1>
            <ul>
                {students.map(student => (
                    <li key={student._id}>
                        {student.firstName} {student.lastName} - {student.program}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListStudents;
