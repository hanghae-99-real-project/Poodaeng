/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import DOMPurify from 'dompurify';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { useQuillStore } from '../zustand/example/zustandAPI';




// eslint-disable-next-line no-shadow
// const useQuillEditor = (initialValue = '') => {
const useQuill = () => {
  // console.log('render occured')
  // const quillRef = useRef()
  const {quillValue, setQuillValue} = useQuillStore((state)=>({
    quillValue: state.quillValue,
    setQuillValue: state.setQuillValue
  }), shallow)
  // const [htmlContent, setHtmlContent] = useState(initialValue)
  const modules = useMemo(()=>({
    toolbar: {
      container: [["bold", "italic", "underline"]],
      handlers: {},
    }
  }))

  // const changeHtmlContent = (newValue) => {
  //   setHtmlContent(htmlContent)
  // }
  

  // useEffect(()=>{
  //   useQuillStore.subscribe(
  //     (st)=>st.quillValue,
  //     (curVal, prevVal) =>{
  //       quillRef.current = curVal;
  //     }
  //   )
  //   return () => {
  //     quillRef.current = ''
  //   }

  // }, [])

  
  const RenderQuill = ({quillRef}) => {
    return(
        // <ReactQuill quillRef={quillRef} theme="snow" className='px-6 py-6 h-64' value={htmlContent} modules={modules} onChange={setHtmlContent} />
        <ReactQuill quillRef={quillRef} theme="snow" className='px-6 py-6 h-64' modules={modules} onChange={(content, delta, source, editor)=>setQuillValue(editor.getHTML())}
        placeholder='글을 작성해주세요' />
    )
  }
  // return [ htmlContent, changeHtmlContent, RenderQuill ]
  return [ RenderQuill ]
}

export default useQuill