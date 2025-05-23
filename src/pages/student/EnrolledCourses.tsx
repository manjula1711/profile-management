import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDataContext } from '../../context/DataContext';
import { Student } from '../../types';

const EnrolledCourses = () => {
  const { currentUser } = useAuth();
  const student = currentUser as Student;
  const { courses } = useDataContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Get courses that the student is enrolled in
  const enrolledCourses = courses.filter(course => 
    student.courses.includes(course.id)
  );

  // Filter courses based on search term
  const filteredCourses = enrolledCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Enrolled Courses</h1>
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No enrolled courses</h3>
          <p className="mt-1 text-gray-500">You haven't enrolled in any courses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                  <p className="text-gray-600">{course.code}</p>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-700">{course.description || 'No description provided.'}</p>
                </div>
                
                <div className="mt-4">
                  <span className="text-sm text-gray-500">
                    Faculty: {course.faculty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;