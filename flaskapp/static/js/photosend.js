var dt = new DataTransfer();

let photo

function handleFileChange(event) {
    let fileNameDisplay = document.getElementById('filetext');
    let fileInput = event.target;
    photo = fileInput.files[0];

    if (photo) {

        document.querySelector(".main__in__photo-name").textContent = photo.name;

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
    
    let formdata = new FormData();
    formdata.append('file', photo);
    // formdata.append('camera', JSON.stringify(camera));
    // formdata.append('model', JSON.stringify(model));
    // formdata.append('check', JSON.stringify(check));
    // formdata.append('test', 'test is work');

    console.log("hello")

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
                console.log(data);
                console.log(data.imgs)
                console.log(data.imgs[0])
                console.log(data.imgs[0].path)


                if (data.imgs.length > 0) {
                    document.getElementById("main__out-container").innerHTML = `
                        <h2 class="main__title">Результат:</h2>
                    `;
                    for (i in data.imgs) {
                        document.getElementById("main__out-container").innerHTML += `
                        <div class="main__out" id="main__out">
                            <div class="main__out__photo-block">
                                <img class="main__out__photo" src="../` + data.imgs[i].path + `" alt="img">
                            </div>
                            <div class="main__out__text-block">
                                <div class="main__out__text-block__name">Имя: ` + data.imgs[i].name + `</div>
                                <div class="main__out__text-block__accuracy">Близость: ` + data.imgs[i].accuracy + `</div>
                            </div>
                        </div>
                        `
                    }
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