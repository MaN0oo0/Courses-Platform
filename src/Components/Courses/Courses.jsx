import React, { useEffect, useState } from 'react';
import api from "../../Helpers/HandleAuthentication";

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/Courses');
                setCourses(response.data.courses);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div>
            <h1>Courses</h1>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>{course.title} - {course.instructor}</li>
                ))}
            </ul>
        </div>
    );
};

export default Courses;
