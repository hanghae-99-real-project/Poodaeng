/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { shallow } from 'zustand/shallow';
import { useQuillStore } from '../zustand/example/zustandAPI';

const QuillEditor = ({ placeholder, useModule, className }) => {
  const { quillValue, setQuillValue } = useQuillStore(
    state => ({
      quillValue: state.quillValue,
      setQuillValue: state.setQuillValue,
    }),
    shallow,
  );

  // const modules = useMemo(() => ({
  //   toolbar: {
  //     container: [['bold', 'italic', 'underline']],
  //     handlers: {},
  //   },
  // }));

  const noModule = {
    toolbar: false,
  };

  const module = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
                'custom-color',
              ],
            },
            { background: [] },
          ],
        ],
        handlers: {},
      },
    }),
    [],
  );

  // useEffect(() => {
  //   useQuillStore.subscribe(
  //     store => store.quillValue,
  //     curVal => {
  //       quillRef.current = curVal;
  //     },
  //   );
  // });
  return (
    <ReactQuill
      theme='snow'
      // className='w-full h-full placeholder:text-sm'
      modules={useModule ? module : noModule}
      className={className}
      style={{ outline: 'none', border: 'none' }}
      placeholder={placeholder}
      value={quillValue}
      onChange={(content, delta, source, editor) =>
        setQuillValue(editor.getHTML())
      }
    />
  );
};

export default QuillEditor;
