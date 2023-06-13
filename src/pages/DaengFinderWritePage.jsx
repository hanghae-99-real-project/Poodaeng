/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { SlMagnifier } from 'react-icons/sl';
import { useMutation, useQueryClient } from 'react-query';
// import { useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shallow } from 'zustand/shallow';
import { editMyPost, writePostLost } from '../api/daengFinder';
import DaengFinderMap from '../components/DaengFinder/DaengFinderWrite/DaengFinderMap';
import useInput from '../hooks/useInput';
import { useFooterLayout } from '../shared/LinkFooterLayout';
import LinkHeader from '../shared/LinkHeader';
import QuillEditor from '../utils/QuillEditor';
import { useLocationStore, useQuillStore } from '../zustand/example/zustandAPI';
import { toastSuccess } from '../utils/ToastFreeSetting';

function DaengFinderWritePage() {
  const pageLocation = useLocation();
  const Ps = pageLocation.state;
  console.log('넘어온 navigate state >>>', Ps);

  const checkPostId = Ps?.passPostId ?? '';
  const daengList = Ps?.daengList ?? [];
  const latitude = Ps?.latitude ?? '';
  const longitude = Ps?.longitude ?? '';
  const createdAt = Ps?.createdAt ?? '';
  const dogname = Ps?.dogname ?? '';
  const title = Ps?.title ?? '';
  const content = Ps?.content ?? '';
  const address = Ps?.address ?? '';
  const [target, onChangeHandler, onClearHandler] = useInput({
    dogname,
    title,
    // content,
  });
  const [image, setImage] = useState({ photo: [], preview: [] });
  const [alertMsg, setAlertMsg] = useState(false);
  const [mapMode, setMapMode] = useState(false);
  const [latlng, setLatLng] = useState({
    lostLongitude: '',
    lostLatitude: '',
  });
  const [afterfirstSearch, setAfterFirstSearch] = useState(false);
  const { quillValue, setQuillValue, clearQuillValue } = useQuillStore(
    state => ({
      quillValue: state.quillValue,
      setQuillValue: state.setQuillValue,
      clearQuillValue: state.clearQuillValue,
    }),
    shallow,
  );
  const { SwitchFooter } = useFooterLayout(state => ({
    SwitchFooter: state.SwitchFooter,
  }));
  const { location, roadAddress, clearRoadAddresss } = useLocationStore(
    state => ({
      location: state.location,
      roadAddress: state.roadAddress,
      clearRoadAddresss: state.clearRoadAddresss,
    }),
    shallow,
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(writePostLost, {
    onSuccess: data => {
      console.log('daengFinderWrite data>>> ', data);
      queryClient.invalidateQueries('getPostLost');
      onClearHandler();
      clearQuillValue();
      clearRoadAddresss();
      setAlertMsg(true);
      toast.success('개시글 작성 완료', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      for (let i = 0; i < image.preview.length; i++) {
        URL.revokeObjectURL(image.preview[i]);
      }
      setImage({ photo: [], preview: [] });
    },
    onError: error => {
      console.log('daengFinderWrite error>>> ', error);
      setAlertMsg(true);
      toast.error('게시글 작성 실패', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const editMutation = useMutation(editMyPost, {
    onSuccess: data => {
      console.log('daengFinderWrite data>>> ', data);
      queryClient.invalidateQueries('getPostLost');
      onClearHandler();
      clearQuillValue();
      clearRoadAddresss();
      setAlertMsg(true);
      toastSuccess('게시글 수정 완료');
      for (let i = 0; i < image.preview.length; i++) {
        URL.revokeObjectURL(image.preview[i]);
      }
      setImage({ photo: [], preview: [] });
    },
    onError: error => {
      console.log('daengFinderWrite error>>> ', error);
      setAlertMsg(true);
      toast.error('게시글 수정 실패', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const searchAddressMode = () => {
    setAfterFirstSearch(true);
    setMapMode(true);
  };

  const uploadPost = () => {
    /**
     *
     *  @description 이거 나중에 수정하는 것도 이미지 올릴 수 있게 바뀌면 조건문 바꿔야 함.
     * 그냥 !checkPostId 빼면 될 듯.
     *  */
    if (!checkPostId && image.photo.length < 1) {
      setAlertMsg(true);
      toast.error('이미지 1개이상 5개이하 필요', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    let inputs;
    const formData = new FormData();
    formData.append('title', target.title);
    // formData.append('content', target.content);
    formData.append('content', quillValue);
    if (checkPostId) {
      inputs = {
        postId: checkPostId,
        formData,
        // formData: {
        //   title: target.title,
        //   content: quillValue,
        // },
      };
      editMutation.mutate(inputs);
      return;
    }
    formData.append('dogname', target.dogname);
    if (image.photo.length > 0) {
      image.photo.forEach(img => {
        // const jsonImg = JSON.stringify(img);
        const blobImg = new Blob([img], { type: img.type });
        formData.append('image', blobImg, img.name);
        // if (checkPostId) {
        //   const blobImg = new Blob([img], { type: img.type ||  'image/*' });
        //   formData.append('image', blobImg, img.name || img);
        // } else {
        //   const blobImg = new Blob([img], { type: img.type });
        //   formData.append('image', blobImg, img.name);
        // }
      });
    }
    console.log('최종 위도 경도 >>>', latlng);
    formData.append('lostLatitude', latlng.lostLatitude);
    formData.append('lostLongitude', latlng.lostLongitude);
    console.log('daengFinderWrite formData before transfer >>> ', ...formData);
    inputs = {
      formData,
    };
    mutation.mutate(inputs);
  };

  const imageHandler = e => {
    // e.preventDefault();
    /* 1. 이미지가 5개보다 적을 때는 하나씩 추가되도록 짜고 */
    /* 2. 한꺼번에 많이 추가할 수 있는 것도 해줘야 함 */
    /* 3. 5개보다 많아지면 다 지우기 */
    console.log(e);
    console.log(e.target.files);
    console.log(Array.from(e.target.files));

    const maxSize = 1024 * 1024 * 25;
    const fileList = Array.from(e.target.files);
    const uploadList = [];
    const previewList = [];

    /** @description 이건 제출할 때 필요. 여기서는 불필요. 나중에 옮기셈. */
    // if (fileList.length < 1) {
    //   setAlertMsg(true);
    //   toast.error('이미지 1개이상 5개이하 필요', {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   return;
    // }

    for (let i = 0; i < fileList.length; i++) {
      const fileType = fileList[i].type.split('/')[0];
      if (fileType !== 'image') {
        setAlertMsg(true);
        toast.error('이미지 파일이 아닙니다.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      if (fileList[i].size > maxSize) {
        setAlertMsg(true);
        toast.error('이미지 크기는 최대 25mb입니다.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      // formData.append('lostPhotoUrl', fileList[i]);
      /** @checkpoint */
      /* 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 revoke로 메모리상에서 폐기 => 메모리 누수 방지 */
      /* 주의할 점은 [i]를 붙여줘야 하는 것. 왜냐면 (현재시점) 직전에 올려둔 이미지를 지울 수도 있기 때문임. */
      /* 근데 나는 이미지 거꾸로 넣어주고 있음! 그래서 at을 써서 뒤에부터 지워줘야 함. */
      if (fileList[i]) URL.revokeObjectURL(image.preview.at(-(i + 1)));
      const url = URL.createObjectURL(fileList[i]);

      /* 얘도 배열임. */
      uploadList.push(fileList[i]);
      previewList.push(url);
    }
    /* 1. 이미지가 5개보다 적을 때는 하나씩 추가되도록 짜고 */
    /* 2. 한꺼번에 많이 추가할 수 있는 것도 해줘야 함 */
    /* 3. 5개보다 많아지면 다 지우고 제일 최근 거로 교체 */
    setImage(prev => ({
      // photo: [...prev.photo, ...photoList].reverse().slice(0, 5),
      // preview: [...prev.photo, ...photoList].reverse().slice(0, 5),
      photo: [...uploadList, ...prev.photo].slice(0, 5),
      preview: [...previewList, ...prev.preview].slice(0, 5),
    }));
  };

  useEffect(() => {
    SwitchFooter(false);
    if (checkPostId) {
      setLatLng({
        lostLatitude: latitude,
        lostLongitude: longitude,
      });
    } else {
      setLatLng({
        // lostLatitude: 33.450701,
        // lostLongitude: 126.570667,
        lostLatitude: location.latitude,
        lostLongitude: location.longitude,
      });
    }
    if (content) {
      setQuillValue('', content);
    }
    if (daengList.length > 0) {
      setImage(prev => ({
        photo: [...prev.photo, ...daengList].slice(0, 5),
        preview: [...prev.preview, ...daengList].slice(0, 5),
      }));
    }
    return () => {
      clearQuillValue();
      for (let i = 0; i < image.preview.length; i++) {
        URL.revokeObjectURL(image.preview[i]);
      }
    };
  }, []);

  return (
    <div className='w-full max-h-[812px]'>
      {alertMsg && <ToastContainer />}
      <LinkHeader
        icon
        destination={!mapMode ? '/daengfinder' : false}
        setMapMode={mapMode ? setMapMode : false}
        feature={
          !mapMode && (
            <div
              className='text-[#8722ED] box-border cursor-pointer'
              onClick={uploadPost}
            >
              등록
            </div>
          )
        }
      >
        {/* 댓글&nbsp;{commentCount}{' '} */}
        댕파인더 글쓰기&nbsp;
      </LinkHeader>
      {mapMode ? (
        <DaengFinderMap latlng={latlng} setLatLng={setLatLng} />
      ) : (
        // <DaengFinderMap />
        <div>
          <form className='py-9 px-6 border-b border-solid border-[#ECECEC]'>
            <div className='f-fc gap-3 mb-4'>
              <input
                name='title'
                value={target.title}
                onChange={onChangeHandler}
                placeholder='제목을 작성해주세요'
                className='w-full pb-4 font-semibold text-xl leading-6 placeholder:text-[#C7C7C7] border-b'
              />
              <input
                name='dogname'
                value={target.dogname}
                onChange={onChangeHandler}
                placeholder='반려견 이름'
                className='w-full pb-3 font-medium text-sm leading-4 placeholder:text-[#C7C7C7] border-b'
              />
              <input
                placeholder='실종 시간'
                className='w-full pb-3 font-medium text-sm leading-4 placeholder:text-[#C7C7C7] border-b'
              />
            </div>
            <div
              className='f-fr-ic gap-1 px-3 py-2 border border-solid rounded-md cursor-pointer'
              onClick={searchAddressMode}
            >
              <SlMagnifier className='text-lg font-bold text-[#C9C9C9]' />
              <div
                className={`${
                  (!afterfirstSearch || !roadAddress) &&
                  !address &&
                  'text-[#C7C7C7]'
                }`}
              >
                {(afterfirstSearch && roadAddress) || address || '실종 위치'}
              </div>
            </div>
            <div className='pt-6'>
              <div className='pb-2'>
                사진 등록{' '}
                <span className='font-bold leading-4 text-[#A54BFF]'>
                  {/* {daengList? daengList.length : image.preview.length} */}
                  {image.preview.length}
                </span>
                /5
              </div>
              {/* x-scroll 방법 알아오기 */}
              <div className='f-fr-ic  relative border'>
                {/* <div className='f-fr-ic w-[20.4375rem] h-fit relative'> */}
                <label
                  htmlFor='image-adder'
                  title='사진등록은 최소 1개이상!
                밑으로 스크롤 해보세요!'
                  // inset-0
                  className={`z-40 cursor-pointer ${
                    image.preview.length
                      ? // ? 'f-fr-ic w-56 h-28'
                        'f-fr-ic w-full h-28'
                      : 'f-fr-ic-jc w-28 h-28'
                    // : 'f-fr-ic-jc w-28 h-28'
                  } overflow-x-scroll border`}
                >
                  <AiOutlinePlusSquare
                    className={`${image.preview.length && 'hidden'}`}
                  />
                  <input
                    type='file'
                    multiple
                    id='image-adder'
                    accept='image/*'
                    className='hidden z-30'
                    // // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
                    // // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
                    onClick={e => {
                      e.target.value = null;
                    }}
                    onChange={imageHandler}
                  />
                  {image.preview.length > 0
                    ? image.preview.map(prv => {
                        return (
                          <img
                            key={prv}
                            src={prv}
                            alt='photoThumb'
                            className='image w-28 h-28 border'
                          />
                        );
                      })
                    : null}
                </label>
              </div>
            </div>
          </form>
          <div className='px-6 py-6 pb-12 h-64'>
            <QuillEditor />
          </div>
        </div>
      )}
    </div>
  );
}

export default DaengFinderWritePage;
