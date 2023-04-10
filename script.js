// Define global variables
var students = [];
var currentStudentIndex = null;

// Get form and table elements
var form = document.getElementById("student-form");
var table = document.getElementById("student-table").getElementsByTagName("tbody")[0];

// Add submit event listener to form
form.addEventListener("submit", function(event) {
	event.preventDefault();

	// Get form values
	var name = document.getElementById("name").value.trim();
	var id = document.getElementById("id").value.trim();
	var major = document.getElementById("major").value.trim();
	var gpa = document.getElementById("gpa").value.trim();

	// Add or update student
	if (currentStudentIndex === null) {
		addStudent(name, id, major, gpa);
	} else {
		updateStudent(currentStudentIndex, name, id, major, gpa);
	}

	// Reset form
	resetForm();
});

// Add student function
function addStudent(name, id, major, gpa) {
	// Create new student object
	var student = {
		name: name,
		id: id,
		major: major,
		gpa: parseFloat(gpa)
	};

	// Add student to array
	students.push(student);

	// Update table
	viewStudents();
}

// Update student function
function updateStudent(index, name, id, major, gpa) {
	// Update student object
	students[index].name = name;
	students[index].id = id;
	students[index].major = major;
	students[index].gpa = parseFloat(gpa);

	// Update table
	viewStudents();

	// Reset current student index
	currentStudentIndex = null;
}

// View students function
function viewStudents() {
	// Clear table
	table.innerHTML = "";

	// Loop through students array and add rows to table
	for (var i = 0; i < students.length; i++) {
		// Create table row and cells
		var row = table.insertRow(i);
		var nameCell = row.insertCell(0);
		var idCell =		row.insertCell(1);
		var majorCell = row.insertCell(2);
		var gpaCell = row.insertCell(3);
		var actionCell = row.insertCell(4);

		// Add student data to cells
		nameCell.innerHTML = students[i].name;
		idCell.innerHTML = students[i].id;
		majorCell.innerHTML = students[i].major;
		gpaCell.innerHTML = students[i].gpa.toFixed(2);

		// Add edit button to action cell
		var editButton = document.createElement("button");
		editButton.innerHTML = "Edit";
		editButton.addEventListener("click", function() {
			// Get student index from row index
			currentStudentIndex = this.parentNode.parentNode.rowIndex - 1;

			// Fill form with student data
			document.getElementById("name").value = students[currentStudentIndex].name;
			document.getElementById("id").value = students[currentStudentIndex].id;
			document.getElementById("major").value = students[currentStudentIndex].major;
			document.getElementById("gpa").value = students[currentStudentIndex].gpa;

			// Change add button text to update
			document.getElementsByTagName("button")[0].innerHTML = "Update";
		});
		actionCell.appendChild(editButton);

		// Add delete button to action cell
		var deleteButton = document.createElement("button");
		deleteButton.innerHTML = "Delete";
		deleteButton.addEventListener("click", function() {
			// Get student index from row index and delete student
			var index = this.parentNode.parentNode.rowIndex - 1;
			students.splice(index, 1);

			// Update table
			viewStudents();
		});
		actionCell.appendChild(deleteButton);
	}
}

// Reset form function
function resetForm() {
	// Reset form fields
	document.getElementById("name").value = "";
	document.getElementById("id").value = "";
	document.getElementById("major").value = "";
	document.getElementById("gpa").value = "";

	// Change add button text to add
	document.getElementsByTagName("button")[0].innerHTML = "Add";

	// Reset current student index
	currentStudentIndex = null;
}

// Initial view of students
viewStudents();


  