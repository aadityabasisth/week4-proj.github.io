let courses = [];
let editIndex = null;
const courseInput = document.getElementById('course');
const assignmentInput = document.getElementById('assignment');
const addOrUpdateButton = document.getElementById('addOrUpdate');
const courseList = document.getElementById('courseList');
const toggleMode = document.getElementById('toggleMode');
const body = document.body;

// Check local storage for dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark');
}

// Toggle dark mode and save preference
toggleMode.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
    } else {
        body.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
    }
});

addOrUpdateButton.addEventListener('click', () => {
    const course = courseInput.value.trim();
    const assignment = assignmentInput.value.trim();
    if (course && assignment) {
        if (editIndex !== null) {
            courses[editIndex] = { course, assignment };
            editIndex = null;
            addOrUpdateButton.textContent = 'Add Course';
        } else {
            courses.push({ course, assignment });
        }
        courseInput.value = '';
        assignmentInput.value = '';
        renderCourses();
    }
});

function renderCourses() {
    courseList.innerHTML = '';
    courses.forEach((c, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-2 border">${c.course}</td>
            <td class="p-2 border">${c.assignment}</td>
            <td class="p-2 border">
                <button class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    onclick="editCourse(${index})">Edit</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onclick="deleteCourse(${index})">Delete</button>
            </td>
        `;
        courseList.appendChild(row);
    });
}

function editCourse(index) {
    courseInput.value = courses[index].course;
    assignmentInput.value = courses[index].assignment;
    editIndex = index;
    addOrUpdateButton.textContent = 'Update Course';
}

function deleteCourse(index) {
    if (confirm('Are you sure you want to delete this course?')) {
        courses.splice(index, 1);
        renderCourses();
    }
}