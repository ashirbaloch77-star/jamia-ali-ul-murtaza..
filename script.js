let students = JSON.parse(localStorage.getItem('madarsaData')) || [];

const form = document.getElementById('madarsaForm');
const recordList = document.getElementById('recordList');
const submitBtn = document.getElementById('submitBtn');
const editIndexField = document.getElementById('editIndex');

// صفحہ لوڈ ہوتے ہی ریکارڈ دکھائیں
displayRecords();

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const studentData = {
        name: document.getElementById('studentName').value,
        father: document.getElementById('fatherName').value,
        age: document.getElementById('age').value,
        darja: document.getElementById('darja').value
    };

    const editIndex = editIndexField.value;

    if (editIndex === "") {
        // نیا ریکارڈ (Create)
        students.push(studentData);
    } else {
        // پرانا ریکارڈ تبدیل کریں (Update)
        students[editIndex] = studentData;
        editIndexField.value = "";
        submitBtn.innerText = "ریکارڈ محفوظ کریں";
    }

    localStorage.setItem('madarsaData', JSON.stringify(students));
    form.reset();
    displayRecords();
});

// ریکارڈ دکھانے کا فنکشن (Read)
function displayRecords() {
    recordList.innerHTML = "";
    students.forEach((data, index) => {
        recordList.innerHTML += `
            <tr>
                <td>${data.name}</td>
                <td>${data.father}</td>
                <td>${data.darja}</td>
                <td>${data.age}</td>
                <td>
                    <button class="edit-btn" onclick="editRecord(${index})">تبدیل</button>
                    <button class="delete-btn" onclick="deleteRecord(${index})">ختم</button>
                </td>
            </tr>
        `;
    });
}

// ریکارڈ ختم کریں (Delete)
function deleteRecord(index) {
    if (confirm("کیا آپ واقعی یہ ریکارڈ ختم کرنا چاہتے ہیں؟")) {
        students.splice(index, 1);
        localStorage.setItem('madarsaData', JSON.stringify(students));
        displayRecords();
    }
}

// ریکارڈ ایڈٹ کریں (Update - Part 1)
function editRecord(index) {
    const data = students[index];
    document.getElementById('studentName').value = data.name;
    document.getElementById('fatherName').value = data.father;
    document.getElementById('age').value = data.age;
    document.getElementById('darja').value = data.darja;
    
    editIndexField.value = index;
    submitBtn.innerText = "اپڈیٹ کریں";
    window.scrollTo(0, 0);
}