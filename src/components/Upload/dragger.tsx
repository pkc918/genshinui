import React, {FC, useState, DragEvent, useRef, useEffect} from 'react';
import classNames from 'classnames';

interface DraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const drop = useRef<HTMLInputElement>(null);

  const {onFile, children} = props;
  const [dragOver, setDragOver] = useState(false);
  const klass = classNames('genshin-uploader-dragger', {
    'is-dragover': dragOver
  });

  const handleDrop:any = (e: DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setDragOver(false);
    // onFile由upload组件传递进来,将file信息传递出去,调用外部的上传文件的方法
    onFile(e.dataTransfer.files);
  };

  useEffect(() => {
    // 监听 drop 事件
    if (drop.current) {
      drop.current.addEventListener('drop', handleDrop);
    }
    return () => {
      if (drop.current) {
        drop.current.addEventListener('drop', handleDrop);
      }
    };
  }, []);



  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.stopPropagation();
    e.preventDefault();
    setDragOver(over);
  };
  return (
    <div className={klass}
         ref={drop}
         onDragOver={e => { handleDrag(e, true); }}
         onDragLeave={e => { handleDrag(e, false); }}
         onDrag={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
