window.onload = function () {
    var arr = [];

    var taskName = document.getElementById('taskName');
    var taskSearch = document.getElementById('taskSearch');
    var searchBtn = document.getElementById('searchBtn');
    var taskDescription = document.getElementById('taskDescription');
    var confirmBtn = document.getElementById('confirmBtn');
    var tbody = document.getElementById('taskBody');
    var taskStatus = document.getElementById('taskStatus');
    var current;
    confirmBtn.addEventListener('click', add)


    function add() {
        var newTask = {
            taskName: taskName.value, taskDescription: taskDescription.value,
            taskStatus: taskStatus.value
        };
        arr.push(newTask);
        showData(arr);
    };

    function showData(arr) {
        tbody.innerHTML = '';
        for (var i = 0; i < arr.length; i++) {
            var nextRow = createRow(arr[i], i);
            tbody.appendChild(nextRow);
        }
    }

    function createRow(obj, rowIndex) {
        var nextTr = document.createElement('tr');
        var cell1 = createCell(obj.taskName);
        var cell2 = createCell(obj.taskDescription);
        var cell3 = createCell(obj.taskStatus);
        var cell4 = document.createElement('td');
        var cell5 = document.createElement('td');

        //Remove button
        var removeBtn = document.createElement('button');
        removeBtn.setAttribute('data-index', rowIndex);
        removeBtn.setAttribute('class', 'btn btn-danger');
        removeBtn.innerText = 'Delete';
        removeBtn.addEventListener('click', remove);
        cell4.appendChild(removeBtn);


        //Edit button
        var editBtn = document.createElement('button');
        editBtn.setAttribute('data-index', rowIndex);
        editBtn.setAttribute('class', 'btn btn-info');
        editBtn.innerText = 'Edit';
        editBtn.addEventListener('click', editTask);
        cell5.appendChild(editBtn);



        nextTr.appendChild(cell1);
        nextTr.appendChild(cell2);
        nextTr.appendChild(cell3);
        nextTr.appendChild(cell4);
        nextTr.appendChild(cell5);
        return nextTr;
    }


    function editTask(event) {
        current = event.target.getAttribute('data-index');
        var getObject = arr[current];
        taskName.value = getObject.taskName;
        taskDescription.value = getObject.taskDescription;
        taskStatus.value = getObject.taskStatus;
        confirmBtn.removeEventListener('click', add);
        confirmBtn.addEventListener('click', edit);
    }

    function edit() {
        var editedTask = {
            taskName: taskName.value, taskDescription: taskDescription.value,
            taskStatus: taskStatus.value
        };
        arr[current] = editedTask;
        showData(arr);
        confirmBtn.removeEventListener('click', edit);
        confirmBtn.addEventListener('click', add);
    }

    function remove(event) {
        var indexAttribute = event.target.getAttribute('data-index');
        arr.splice([indexAttribute], 1);
        showData(arr);
    }

    function createCell(text) {
        var nextTd = document.createElement('td');
        nextTd.innerText = text;
        return nextTd;
    }

    searchBtn.addEventListener('click', searchTask);

    function searchTask() {
        var temp = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].taskName == taskSearch.value || arr[i].taskDescription == taskSearch.value ||
                arr[i].taskStatus == taskSearch.value) {
                temp.push(arr[i]);
            }
        }
        taskSearch.value='';
        showData(temp);
    }
}