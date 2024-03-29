var dt = new DataTransfer();

let photo

function handleFileChange(event) {
    let fileNameDisplay = document.getElementById('filetext');
    let fileInput = event.target;
    photo = fileInput.files[0];

    if (photo) {

        document.querySelector(".main__in__photo-name").textContent = photo.name;
        document.getElementById("filetext").textContent = photo.name

        let reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector(".main__in__photo").src = e.target.result;
        };
        reader.readAsDataURL(photo);
    } else {
        fileNameDisplay.textContent = '';
    }
}


let sendfilebtn = document.querySelector(".main__in__sendbtn");

sendfilebtn.addEventListener("click", function (e) {
    e.preventDefault();
    
    // let input = document.getElementById("file");
    // let camera = document.getElementById("camera").value;
    // let model = document.getElementById("model").value;
    // let check = document.getElementById("check").checked;
    // let file = input.files[0];

    actions = []

    if (document.getElementById("checkbox_age").checked) {
        actions.push("age")
    };
    if (document.getElementById("checkbox_gender").checked) {
        actions.push("gender")
    };
    if (document.getElementById("checkbox_race").checked) {
        actions.push("race")
    };
    if (document.getElementById("checkbox_emotion").checked) {
        actions.push("emotion")
    };

    
    model = document.getElementById("main__select_model").value
    console.log(model)

    let formdata = new FormData();
    formdata.append('file', photo);
    formdata.append('actions', actions);
    formdata.append('model', model);
    // formdata.append('camera', JSON.stringify(camera));
    // formdata.append('model', JSON.stringify(model));
    // formdata.append('check', JSON.stringify(check));
    // formdata.append('test', 'test is work');


    if (typeof photo != 'undefined') {
        document.getElementById("main__out-container").innerHTML = `
            <div class="img__container">
                <img class="img__loading" src="static/img/loading.png" alt="loading">
            </div>

            <style>
                .img__container {
                    flex: 1;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .img__loading {
                    width: 100px;
                    height: 100px;
                    animation: rotate_img 0.5s linear infinite;
                }

                @keyframes rotate_img {
                    0% {
                      transform: rotate(0deg);
                    }
                    100% {
                      transform: rotate(360deg);
                    }
                  }
            </style>
        `;
        

        fetch("/api/photo",
        {
            method: "POST",
            body: formdata,
            /*headers: {
                'Content-Type': 'multipart/form-data'
            }*/
        })
        .then( response => {
            response.json().then(function(data) {

                // var encodedImage = data.image_url;

                // // Декодирование Base64 в бинарные данные
                // var decodedImage = atob(encodedImage);

                // // Преобразование бинарных данных в массив байт
                // var byteCharacters = decodedImage.split('').map(char => char.charCodeAt(0));
                // var byteArray = new Uint8Array(byteCharacters);

                // // Тип изображения (зависит от формата изображения)
                // var imageType = 'image/jpeg';

                // // Создание объекта Blob из массива байт с правильным типом
                // var blob = new Blob([byteArray], { type: imageType });

                // // Создание объекта URL для использования в src атрибуте изображения
                // var imageUrl = URL.createObjectURL(blob);
                console.log(data.recognize_list);
                console.log(data.facial_list)


                if (data.recognize_list.length > 0) {
                    document.getElementById("main__out-container").innerHTML = `
                        <div class="main__partition"></div>
                        <h2 class="main__title">Результат:</h2>
                    `;
                    for (i in data.recognize_list) {
                        path_of_img = `` + data.recognize_list[i].path;
                        path_of_img = path_of_img.replace('\\','/');
                        console.log(path_of_img);
                        document.getElementById("main__out-container").innerHTML += `
                        <div class="main__out" id="main__out">
                            <div class="main__out__photo-block">
                                <img class="main__out__photo" src="` + path_of_img + `" alt="img">
                            </div>
                            <div class="main__out__text-block">
                                <div class="main__out__text-block__name">Имя: ` + `Somename` + `</div>
                                <div class="main__out__text-block__accuracy">Близость: ` + data.recognize_list[i].distance + `</div>
                            </div>
                        </div>
                        `;

                        text_block = document.querySelector(".main__out__text-block")
                        if (actions.includes("age")) {
                            text_block.innerHTML += `<div class="main__out__text-block__accuracy">Возраст: ` + data.facial_list[i].age + `</div>`
                        };
                        if (actions.includes("gender")) {
                            text_block.innerHTML += `<div class="main__out__text-block__accuracy">Пол: ` + data.facial_list[i].dominant_gender + `</div>`
                        };
                        if (actions.includes("race")) {
                            text_block.innerHTML += `<div class="main__out__text-block__accuracy">Раса: ` + data.facial_list[i].dominant_race + `</div>`
                        };
                        if (actions.includes("emotion")) {
                            text_block.innerHTML += `<div class="main__out__text-block__accuracy">Эмоция: ` + data.facial_list[i].dominant_emotion + `</div>`
                        };
                    }
                }
                else {
                    document.getElementById("main__out-container").innerHTML = `
                        <div class="main__partition"></div>
                        <h2 class="main__title" style="color: red">Не найдено совпадений:</h2>
                    `;
                }

            });
        })
        .catch( error => {
            alert(error);
            console.error('error:', error);
        });
        
    }
    else {
        document.getElementById("error").innerHTML = `
            <div style="color: red;">
                Выберите файл
            </div>
        `
    }
});