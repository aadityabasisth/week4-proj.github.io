let courses = [];
let editIndex = null;
const courseInput = document.getElementById('course');
const assignmentInput = document.getElementById('assignment');
const addOrUpdateButton = document.getElementById('addOrUpdate');
const courseList = document.getElementById('courseList');
const toggleMode = document.getElementById('toggleMode');
const body = document.body;

toggleMode.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
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
            <td>${c.course}</td>
            <td>${c.assignment}</td>
            <td>
                <button onclick="editCourse(${index})">Edit</button>
                <button onclick="deleteCourse(${index})">Delete</button>
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
    courses.splice(index, 1);
    renderCourses();
}
