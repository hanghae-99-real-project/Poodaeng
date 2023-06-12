import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { shallow } from 'zustand/shallow';
import { useQuillStore } from '../zustand/example/zustandAPI';

const QuillEditor = ({ quillRef }) => {
  const { quillValue, setQuillValue } = useQuillStore(
    state => ({
      quillValue: state.quillValue,
      setQuillValue: state.setQuillValue,
    }),
    shallow,
  );

  const modules = useMemo(() => ({
    toolbar: {
      container: [['bold', 'italic', 'underline']],
      handlers: {},
    },
  }));
  return (
    <ReactQuill
      ref={quillRef}
      theme='snow'
      className='w-full h-full'
      modules={modules}
      defaultValue={quillValue}
      onChange={(content, delta, source, editor) =>
        setQuillValue(editor.getText(), editor.getHTML())
      }
    />
  );
};

export default QuillEditor;
