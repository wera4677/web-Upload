//미리보기 표시하기 위한 코드

const filePickerElement = document.getElementById("image");
const imagePreviewElement = document.getElementById("image-preview");

function showPreview(){
    const files = filePickerElement.files; //여러파일을 선택할수있기때문에 복수형
    if(!files || files.length === 0) {
        imagePreviewElement.style.display ="none";
        return;
    }

    const pickedFile =files[0];

    imagePreviewElement.src = URL.createObjectURL(pickedFile);//파일을 가져와 이미지 소스로 사용할수있는 URL로 변환
    imagePreviewElement.style.display ="block";
}


filePickerElement.addEventListener("change",showPreview) //선택한 값이 변경될때 마다 발생

