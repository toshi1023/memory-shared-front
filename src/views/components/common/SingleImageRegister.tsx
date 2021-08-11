import React from 'react';

const draggable = (fileArea: HTMLDivElement) => {
    console.log('Hi')
    fileArea.addEventListener('dragover', function(evt){
        console.log('dragover')
        evt.preventDefault();
        fileArea.classList.add('dragover');
    });
    fileArea.addEventListener('dragleave', function(evt){
        console.log('dragleave')
        evt.preventDefault();
        fileArea.classList.remove('dragover');
    });
    fileArea.addEventListener('drop', function(evt){
        evt.preventDefault();
        fileArea.classList.remove('dragenter');
        let files = evt.dataTransfer!.files;
        console.log("DRAG & DROP");
        console.table(files);
        // fileInput!.files = files;
        // photoPreview('onChenge',files[0]);
    });
}

/**
 * 画像のプレビュー表示
 * @param event 
 * @param f 
 */
// const photoPreview = (event, f = null) => {
//     let file = f;
//     if(file === null){
//         file = event.target.files[0];
//     }
//     const reader = new FileReader();
//     let preview = document.getElementById("previewArea");
//     let previewImage = document.getElementById("previewImage");

//     if(previewImage != null) {
//         preview.removeChild(previewImage);
//     }
//     reader.onload = function(event) {
//         var img = document.createElement("img");
//         img.setAttribute("src", reader.result);
//         img.setAttribute("id", "previewImage");
//         preview.appendChild(img);
//     };
//     reader.readAsDataURL(file);
// }

/**
 * 画像のドラッグ&ドロップ + 画像のプレビュー表示用関数
 * @returns 
 */
const SingleImageRegister = () => {
    const fileArea = document.getElementById('dragDropArea') as HTMLDivElement;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    // ドラッグ&ドロップのイベント定義
    if(fileArea !== null) {
        draggable(fileArea);
    }

    // onChange={(e) => photoPreview(e)}

    return (
        <div id="dragDropArea">
            <div className="drag-drop-inside">
                <p className="drag-drop-info">ここにファイルをドロップ</p>
                <p>または</p>
                <p className="drag-drop-buttons">
                    <input id="fileInput" type="file" accept="image/*" name="photo"  />
                </p>
                <div id="previewArea"></div>
            </div>
        </div>
    )
}

export default SingleImageRegister
