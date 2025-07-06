let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null;

function renderTable(data) {
  const tbody = document.getElementById('studentTableBody');
  tbody.innerHTML = '';
  data.forEach((student, index) => {
    const row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.regNo}</td>
        <td>${student.dept}</td>
        <td>${student.year}</td>
        <td>${student.marks}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function saveToStorage() {
  localStorage.setItem('students', JSON.stringify(students));
}

document.getElementById('studentForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const regNo = document.getElementById('regNo').value.trim();
  const dept = document.getElementById('dept').value.trim();
  const year = document.getElementById('year').value;
  const marks = document.getElementById('marks').value;

  const newStudent = { name, regNo, dept, year, marks };

  if (editIndex !== null) {
    students[editIndex] = newStudent;
    editIndex = null;
  } else {
    students.push(newStudent);
  }

  saveToStorage();
  renderTable(students);
  this.reset();
});

function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('regNo').value = student.regNo;
  document.getElementById('dept').value = student.dept;
  document.getElementById('year').value = student.year;
  document.getElementById('marks').value = student.marks;
  editIndex = index;
}

function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this student?')) {
    students.splice(index, 1);
    saveToStorage();
    renderTable(students);
  }
}

document.getElementById('search').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = students.filter(s => s.name.toLowerCase().includes(keyword));
  renderTable(filtered);
});

window.onload = () => renderTable(students);