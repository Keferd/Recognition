var dt = new DataTransfer();

let video

function videoLoad(event) {
    let fileNameDisplay = document.getElementById('videofiletext');
    let fileInput = event.target;
    video = fileInput.files[0];

    if (video) {

        document.getElementById("videofiletext").textContent = video.name

    } else {
        fileNameDisplay.textContent = '';
    }
}


let sendvideobtn = document.querySelector(".main__in__sendbtn");

sendvideobtn.addEventListener("click", function (e) {
    e.preventDefault();
    
    // let input = document.getElementById("file");
    // let camera = document.getElementById("camera").value;
    // let model = document.getElementById("model").value;
    // let check = document.getElementById("check").checked;
    // let file = input.files[0];
    
    let formdata = new FormData();
    formdata.append('file', video);
    // formdata.append('camera', JSON.stringify(camera));
    // formdata.append('model', JSON.stringify(model));
    // formdata.append('check', JSON.stringify(check));
    // formdata.append('test', 'test is work');

    console.log("hello")

    if (typeof video != 'undefined') {
        document.getElementById("video__out-container").innerHTML = `
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
        

        fetch("/api/video",
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
                    document.getElementById("video__out-container").innerHTML = `
                        <div class="video__result-container">
                            <h2 class="main__title">Результат:</h2>
                            <div class="video__out-partition"> </div>
                            <div class="video__out-content" id="video__out-content">

                            </div>
                        </div
                    `;
                    for (i in data.imgs) {
                        document.getElementById("video__out-content").innerHTML += `
                        <div class="main__out__item" id="main__out__item">
                            
                            <img class="main__out__photo" src="../` + data.imgs[i].path + `" alt="img">
                            
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