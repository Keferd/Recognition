var dt = new DataTransfer();

let photo

function handleFileChange(event) {
    let fileNameDisplay = document.getElementById('filetext');
    let fileInput = event.target;
    photo = fileInput.files[0];

    if (photo) {
        fileNameDisplay.textContent = photo.name;
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
        document.getElementById("main__out").innerHTML = `
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

                var encodedImage = data.image_url;

                // Декодирование Base64 в бинарные данные
                var decodedImage = atob(encodedImage);

                // Преобразование бинарных данных в массив байт
                var byteCharacters = decodedImage.split('').map(char => char.charCodeAt(0));
                var byteArray = new Uint8Array(byteCharacters);

                // Тип изображения (зависит от формата изображения)
                var imageType = 'image/jpeg';

                // Создание объекта Blob из массива байт с правильным типом
                var blob = new Blob([byteArray], { type: imageType });

                // Создание объекта URL для использования в src атрибуте изображения
                var imageUrl = URL.createObjectURL(blob);

                // for (i in data.json_object[0]) {
                //     console.log(i+1, data.json_object[0][i], data.json_object[1][i])
                // }


                document.getElementById("main__out").innerHTML = `
                    
                    <h2 class="main__h2">
                        Результат
                    </h2>
                    <div class="result__img"> 
                        <img src=` + imageUrl + ` alt="Изображение">
                    </div>

                    <a class="aside__button_a" href=` + imageUrl + ` download="result.jpg">
                        <input  class="aside__button_download" type="button" value="Скачать">
                    </a>

                    <div style="font-size: 24px; margin-top: 30px; margin-bottom: 50px;">
                        <table id="table" style="border-spacing: 0;"> 
                            
                        </table>
                    </div>

                    <style>
                        th {
                            background-color: #3498db;
                            color: #fafafa;
                        }

                        td, th {
                            min-width: 100px;
                            min-height: 40px;
                            border: 1px solid black;
                            text-align: center;
                        }
                    </style>
                    `;  

                    // if (data.json_object[0].length > 0) {
                    //     document.getElementById("table").innerHTML += `
                    //         <caption>Таблица объектов</caption>
                    //         <thead>
                    //             <tr>
                    //                 <th>Id</th>
                    //                 <th>Sign</th>
                    //                 <th>Score</th>
                    //                 <th>Dist</th>
                    //             </tr>
                    //         </thead>   
                    //         <tbody id="tbody">

                    //         </tbody>
                    //     `;

                    //     for (i in data.json_object[0]) {
                    //         document.getElementById("tbody").innerHTML += `
                    //             <tr>
                    //                 <td>` + data.json_object[0][i] + `</td>
                    //                 <td>` + data.json_object[1][i] + `</td>
                    //                 <td>` + data.json_object[2][i] + `</td>
                    //                 <td>` + data.json_object[3][i] + `</td>
                    //             </tr>
                    //         `;
                    //     };
                    // }

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