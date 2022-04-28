import React, {ChangeEvent, useRef} from "react";
import axios from "axios";

import Button from "../Button";

export interface UploadProps {
  action: string; // 上传到的地址
  onProgress?: (percentage: number, file: File) => void; // 上传进度
  onSuccess?: (data: any, file: File) => void; // 返回成功信息
  onError?: (err: any, file: File) => void; // 返回错误信息
}

const Upload: React.FC<UploadProps> = (props) => {
  const {action, onProgress, onSuccess, onError} = props;
  const fileInput = useRef<HTMLInputElement>(null);
  // 点击按钮，出发上传的点击事件，选择文件
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  // 选择文件出发事件
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    // 上传文件事件
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach(file => {
      const formData = new FormData();
      formData.append(file.name, file);
      axios.post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        }
      }).then(res => {
        console.log(res);
        if (onSuccess) {
          onSuccess(res.data, file);
        }
      }).catch(err => {
        console.log(err);
        if (onError) {
          onError(err, file);
        }
      });
    });
  };
  return (
    <div className="genshin-upload-component">
      <Button
        btnType={"primary"}
        onClick={handleClick}
      >Upload File</Button>
      <input
        className="genshin-file-input"
        style={{display: "none"}}
        ref={fileInput}
        type={"file"}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Upload;
