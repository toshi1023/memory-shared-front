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
    // 親要素のクリック発火関数を無効化
    event.stopPropagation(); 

    const preview = document.getElementById("previewArea") as HTMLDivElement;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    let previewImage = document.getElementById("previewImage");

    // 画像を空にする
    if(previewImage !== null) {
        preview.removeChild(previewImage);
        fileInput.value = '';
    }
}

/**
 * 画像判定
 * @param arrayBuffer 
 * @returns 
 */
const confirmImageFormat = (file: ArrayBuffer) => {
    const arr = new Uint8Array(file).subarray(0, 4);
    let header = '';
  
    for(var i = 0; i < arr.length; i++) {
      header += arr[i].toString(16);
    }
  
    switch(true) {
        case /^89504e47/.test(header):
            console.log('image/png');
            return true;
        case /^47494638/.test(header):
            console.log('image/gif');
            return true;
        case /^424d/.test(header):
            console.log('image/bmp');
            return true;
        case /^ffd8ff/.test(header):
            console.log('image/jpeg');
            return true;
        default:
            console.log('unknown image type');
            return false;
    }
}

/**
 * ドラッグアンドドロップ
 * @param fileArea 
 */
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

        console.table(files);
        if(files !== null) {
            // ファイルを2つ以上受け付けないように設定
            if(files.length > 1) {
                alert('画像は1つしか設定できません');
                return;
            }
            
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
const photoPreview = async (f: File) => {
    let file = f;
    if(file !== null) {
        // 画像かどうか判定
        const buffer = await f.arrayBuffer();
        if(!confirmImageFormat(buffer)) {
            alert('画像以外は設定できません');
            return;
        }

        const reader = new FileReader();

        const preview = document.getElementById("previewArea") as HTMLDivElement;
        let previewImage = document.getElementById("previewImage");
    
        if(previewImage !== null) {
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

const photoChangePreview = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file: File;

    // ファイルが1つ以上でなければ実行しない
    if(event.currentTarget.files !== null && event.currentTarget.files.length > 0){
        // ファイルを2つ以上受け付けないように設定
        if(event.currentTarget.files.length > 1) {
            alert('画像は1つしか設定できません');
            return;
        }

        file = event.currentTarget.files[0];

        // 画像かどうか判定
        const buffer = await event.currentTarget.files[0].arrayBuffer();
        if(!confirmImageFormat(buffer)) {
            alert('画像以外は設定できません');
            return;
        }
        
        const reader = new FileReader();
        const preview = document.getElementById("previewArea") as HTMLDivElement;
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
const SingleImageRegister: React.FC = () => {
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
