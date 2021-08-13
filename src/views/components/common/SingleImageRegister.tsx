import React, { useEffect } from 'react';
import '../../../styles/home/home.scss';
import { Button } from '@material-ui/core';

/**
 * ファイル選択画面の表示
 */
const handleFileClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    fileInput.click();
}

/**
 * 設定した画像の消去
 */
const handleFileClear = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    console.log('click');
}

const draggable = (fileArea: HTMLDivElement) => {
    fileArea.addEventListener('dragover', function(evt: DragEvent){
        evt.preventDefault();
        fileArea.classList.add('dragover');
    });
    fileArea.addEventListener('dragleave', function(evt: DragEvent){
        evt.preventDefault();
        fileArea.classList.remove('dragover');
    });
    fileArea.addEventListener('drop', function(evt: DragEvent){
        evt.preventDefault();
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;

        fileArea.classList.remove('dragenter');
        let files = evt.dataTransfer!.files;
        console.log("DRAG & DROP");
        console.table(files);
        if(files !== null) {
            fileInput!.files = files;
            photoPreview(files[0]);
        }
    });
}

/**
 * 画像のプレビュー表示
 * @param event 
 * @param f 
 */
const photoPreview = (f: File) => {
    let file = f;
    if(file !== null) {
        const reader = new FileReader();
        let preview = document.getElementById("previewArea") as HTMLDivElement;
        let previewImage = document.getElementById("previewImage");
    
        if(previewImage != null) {
            preview.removeChild(previewImage);
        }
        reader.onload = function() {
            var img = document.createElement("img");
            if(reader.result !== null) {
                img.setAttribute("src", reader.result as string);
                img.setAttribute("id", "previewImage");
                preview.appendChild(img);
            }
        };
        reader.readAsDataURL(file);
    }
}

const photoChangePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file: File;
    if(event.currentTarget.files !== null){
        file = event.currentTarget.files[0];

        const reader = new FileReader();
        let preview = document.getElementById("previewArea") as HTMLDivElement;
        let previewImage = document.getElementById("previewImage");

        if(previewImage != null) {
            preview.removeChild(previewImage);
        }
        reader.onload = function() {
            var img = document.createElement("img");
            if(reader.result !== null) {
                img.setAttribute("src", reader.result as string);
                img.setAttribute("id", "previewImage");
                preview.appendChild(img);
            }
        };
        reader.readAsDataURL(file);
    }
}

/**
 * 画像のドラッグ&ドロップ + 画像のプレビュー表示用関数
 * @returns 
 */
const SingleImageRegister = () => {
    const fileArea = document.getElementById('dragDropArea') as HTMLDivElement;

    // ドラッグ&ドロップのイベント定義
    useEffect(() => {
        if(fileArea !== null) {
            fileArea.addEventListener('draggable', () => draggable(fileArea));
        }
    });


    return (
        <div id="dragDropArea" onClick={() => handleFileClick()}>
            <div className="drag-drop-inside">
                <p className="drag-drop-info">ここにファイルをドロップ</p>
                <p className="drag-drop-buttons">
                    <input id="fileInput" type="file" accept="image/*" name="photo" onChange={(event) => photoChangePreview(event)} style={{ display: 'none' }} />
                </p>
                <Button id="fileClear" className="c_clear clear_button_place" onClick={(event) => handleFileClear(event)}>クリア</Button>
                <div id="previewArea"></div>
            </div>
        </div>
    )
}

export default SingleImageRegister
