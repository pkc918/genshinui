import React, {FC, useRef, useState} from 'react';
import axios from 'axios';
import {ChangeEvent} from 'react';
import {UploadList} from './uploadList';
import Dragger from './dragger';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
  uid: string; // 文件id
  size: number; // 文件大小
  name: string; // 文件名称
  status?: UploadFileStatus; // 文件状态
  percent?: number; // 文件上传进度
  raw?: File; // 文件信息
  response?: any; // 响应
  error?: any; // 错误
}

export interface UploadProps {
  action: string; // 上传路径
  defaultFileList?: UploadFile[]; // 上传多个文件的列表
  beforeUpload?: (file: File) => boolean | Promise<File>; // 上传之前的触发事件
  onProgress?: (percentage: number, file: File) => void; // 进度
  onSuccess?: (data: any, file: File) => void; // 成功回调
  onError?: (err: any, file: File) => void; // 失败回调
  onChange?: (file: File) => void; // 选择文件时触发
  onRemove?: (file: UploadFile) => void; // 删除上传的文件触发
  headers?: { [key: string]: any }; // 自定义请求头信息
  name?: string; // 上传到后台的文件名
  data?: { [key: string]: any }; // 直接更多的数据
  withCredentials?: boolean; // 是否携带 cookie, 默认不携带
  accept?: string; // 限制用户上传类型
  multiple?: boolean; // 多个文件是否能被同时选中
  drag?: boolean; // 拖动上传
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  // 上传列表的每个文件
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return {...file, ...updateObj};
        } else {
          return file;
        }
      });
    });
  };
  // 点击
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  // 选择文件
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };
  // 将删除事件传递给 uploadList 组件, uploadList 组件执行删除,将删除的文件信息回传出来
  const handleRemove = (file: UploadFile) => {
    // 删选出,被删除的 uid, 执行 remove 操做
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  // 上传文件
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach(file => {
      // 上传之前,判断有无 上传前的函数
      if (!beforeUpload) {
        post(file);
      } else {
        // 将文件信息传递给 beforeUpload 回调
        // result 是 boolean 或者 Promise对象
        // result 为 true, 或者有值且为 Promise 对象,那就执行上传操作
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile);
          });
        } else if (result) {
          post(file);
        }
      }
    });
  };
  // 上传
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    };
    // setFileList([_file, ...fileList]);
    setFileList((prevList) => {
      return [_file, ...prevList];
    });

    let formData = new FormData();
    formData.append(name || 'fileName', file);
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      // 上传进度
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage < 100) {
          updateFileList(_file, {percent: percentage, status: 'uploading'});
          if (onProgress) {
            onProgress(percentage, file);
          }
        }
      }
    }).then(resp => {
      updateFileList(_file, {status: 'success', response: resp.data});
      if (onSuccess) {
        onSuccess(resp.data, file);
      }
      if (onChange) {
        onChange(file);
      }
    }).catch(err => {
      console.error(err);
      updateFileList(_file, {status: 'error', error: err});
      if (onError) {
        onError(err, file);
      }
      if (onChange) {
        onChange(file);
      }
    });
  };

  return (
    <div className="genshin-upload-component">
      <div className="genshin-upload-input"
           style={{display: 'inline-block'}}
           onClick={handleClick}
      >
        {drag ? <Dragger onFile={(files) => { uploadFiles(files) }}>
          {children}
        </Dragger> : children}

        <input
          className="genshin-file-input"
          style={{display: 'none'}}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        >
        </input>
      </div>


      <UploadList fileList={fileList} onRemove={handleRemove}>
      </UploadList>
    </div>
  );
};


Upload.defaultProps = {
  name: 'file'
};

export default Upload;
