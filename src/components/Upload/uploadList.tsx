import React, { FC } from 'react';

import { UploadFile } from './upload'
import Icon from '../Icon/icon'
import Progress from '../Progress/progress'

interface UploadListProps {
  fileList: UploadFile[]; // 文件列表
  onRemove: (_file: UploadFile) => void; // 删除事件
}


export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="genshin-upload-list">
      {
        fileList.map(item => {
          return (
            <li className="genshin-upload-list-item" key={item.uid}>
              <span className={`file-name file-name-${item.status}`}>
                <Icon icon="file-alt" theme="secondary" />
                {item.name}
              </span>
              {/*根据不同状态展示不同样式图标*/}
              <span className="file-status">
                {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin />}
                {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
                {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
              </span>
              {/*每个文件的删除按钮*/}
              <span className="file-actions">
                <Icon icon="times" onClick={() => { onRemove(item) }} />
              </span>
              {item.status === 'uploading' &&
              <Progress percent={item.percent || 0} />
              }
            </li>
          )
        })
      }
    </ul>
  )
}

export default UploadList;
