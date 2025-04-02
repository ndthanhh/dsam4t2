// Mảng để lưu trữ danh sách sinh viên
let students = [];

// Hàm thêm sinh viên mới
function addStudent() {
    // Lấy giá trị từ các trường input
    const name = document.getElementById('name').value;
    const hometown = document.getElementById('hometown').value;
    const birthdate = document.getElementById('birthdate').value;

    // Kiểm tra xem các trường đã được điền đầy đủ chưa
    if (!name || !hometown || !birthdate) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    // Tạo đối tượng sinh viên mới
    const student = {
        name: name,
        hometown: hometown,
        birthdate: birthdate,
        age: calculateAge(birthdate), // Tính tuổi dựa trên ngày sinh
        inputOrder: students.length + 1 // Thêm thứ tự nhập vào
    };

    // Thêm sinh viên vào mảng
    students.push(student);

    // Cập nhật danh sách hiển thị
    updateStudentList();

    // Xóa nội dung các trường input
    clearForm();
}

// Hàm tính tuổi dựa trên ngày sinh
function calculateAge(birthdate) {
    // Lấy ngày hiện tại
    const today = new Date();
    // Chuyển đổi chuỗi ngày sinh thành đối tượng Date
    const birthDate = new Date(birthdate);

    // Tính số milliseconds giữa ngày hiện tại và ngày sinh
    const timeDiff = today - birthDate;

    // Chuyển đổi milliseconds thành năm
    // 1 năm = 365.25 ngày (tính cả năm nhuận)
    // 1 ngày = 24 * 60 * 60 * 1000 milliseconds
    const age = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));

    return age;
}

// Hàm xóa nội dung các trường input
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('hometown').value = '';
    document.getElementById('birthdate').value = '';
}

// Hàm tìm kiếm sinh viên theo tên
function searchStudent() {
    // Lấy từ khóa tìm kiếm và chuyển thành chữ thường
    const searchTerm = document.getElementById('search').value.toLowerCase();

    // Lọc danh sách sinh viên dựa trên từ khóa tìm kiếm
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm)
    );

    // Hiển thị kết quả tìm kiếm
    displayStudents(filteredStudents);
}

// Hàm sắp xếp danh sách theo tuổi
function sortByAge() {
    // Sử dụng hàm sort với comparator để sắp xếp theo tuổi
    students.sort((a, b) => a.age - b.age);
    // Cập nhật danh sách hiển thị
    updateStudentList();
}

// Hàm hiển thị danh sách theo thứ tự nhập vào
function showInputOrder() {
    // Sắp xếp lại mảng theo thứ tự nhập vào
    students.sort((a, b) => a.inputOrder - b.inputOrder);
    // Cập nhật danh sách hiển thị
    updateStudentList();
}

// Hàm cập nhật danh sách hiển thị
function updateStudentList() {
    displayStudents(students);
}

// Hàm hiển thị danh sách sinh viên lên bảng
function displayStudents(studentArray) {
    // Lấy thẻ tbody của bảng
    const tbody = document.getElementById('studentList');
    // Xóa nội dung cũ
    tbody.innerHTML = '';

    // Duyệt qua từng sinh viên và tạo hàng mới trong bảng
    studentArray.forEach(student => {
        const row = document.createElement('tr');
        // Tạo nội dung cho hàng với thông tin sinh viên
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.hometown}</td>
            <td>${student.birthdate}</td>
            <td>${student.age}</td>
        `;
        // Thêm hàng vào bảng
        tbody.appendChild(row);
    });
} 