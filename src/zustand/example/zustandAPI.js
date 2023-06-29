/* eslint-disable no-unused-vars */
import Cookies from "js-cookie"
import { create } from "zustand"
import { devtools, persist, subscribeWithSelector } from "zustand/middleware"
import { shallow } from "zustand/shallow"
import convertCoordinates from "../../kakao/KakaoApi"
import { tokenStore } from "../../pages/SignInPage"
import { searchListStore } from "../components/Input"


const initRoadAddress = ''
const initLocation = {latitude: 0, longitude: 0}
/** @description 주소변환 및 관리 */
const locationStore = subscribeWithSelector((set, get)=> ({
  location: {...initLocation},
  roadAddress: initRoadAddress,
  setLocation: (latitude, longitude)=> set(()=>({
    location: {latitude, longitude},
  })),
  setRoadAddress: (roadAddress)=> {
    if(roadAddress) {
      set((prev)=>({
        ...prev,
        roadAddress
      }))
    } else {
      set((prev)=>({
        ...prev,
        roadAddress: '',
      }))
    }
  },
  getRoadAddress: async(latitude, longitude)=> {
    try {
      await convertCoordinates(latitude, longitude).then(d => {
        const rdAd = d.data?.documents[0]?.road_address?.address_name;
        const ad = d.data?.documents[0]?.address?.address_name;
        set((prev)=>({
          ...prev,
          roadAddress:rdAd || ad
        }))
      })
      // .catch(err => console.log(err));
    } catch (error) {
      set((prev)=>({
        ...prev,
        roadAddress: error
      }))
    }
  },
  clearRoadAddresss: () => set(()=>({roadAddress: initRoadAddress, location: {...initLocation}}))
}))


export const useLocationStore = create(
  process.env.NODE_ENV === 'development'? devtools(locationStore, {name: 'locationStore'}) : locationStore
  )



/** @description comment page input 관리 */
const inputStore = set => ({
  initialComment: '',
  changeInitialVal: value => {
    set(() => ({
      initialComment: value,
    }));
  },
  onClearInitialVal: () => {
    set(() => ({ initialComment: '' }));
  },
  // changeInitialVal: e => {
  //   set(prev => ({
  //     initialVal: { ...prev.initialVal, [e.target.name]: e.target.value },
  //   }));
  // },
});
export const InputStore = create(
  persist(process.env.NODE_ENV === 'development' ? devtools(inputStore, {name: "inputStore"}) : inputStore, {name: "inputMemory"})
);



/** @description QuillEditor 관리 */
const initialValue = ""
const store = (set)=> ({
  pureText: initialValue,
  quillValue: initialValue,
  setQuillValue: (htmlText) =>{
    // console.log('순수 텍스트', pureText)
    // console.log('htmlText', htmlText)
    set(()=> ({quillValue: htmlText}))
  },
  setPureText: (pureText)=>{
    set(()=>({pureText}))
  },
  clearQuillValue: () => set(()=>({pureText:initialValue ,quillValue: initialValue}))
})

export const useQuillStore = create(subscribeWithSelector(store))


export const resetUserInfoLog = () => {
  const { deleteToken } = tokenStore.getState()
  const { clearSearchWordAll } = searchListStore.getState()
  sessionStorage.setItem('scroller', JSON.stringify(0))
  localStorage.removeItem('agreed') 
  Cookies.remove('refreshToken')
  deleteToken()
  clearSearchWordAll()
}

