import React from 'react';

function Maincomponent() {
  return (
    <div className="container">
      <div className="flex justify-between">
        <img src="Logo.png" alt="Logo.png" />
        <img src="Alert.png" alt="Alert.png" />
      </div>
      <div className="w-[375px] h-[179px] border">
        <div>eventBox</div>
      </div>
      <div>
        <div>내주변푸박스찾기</div>
        <div>지금 내 주변에 있는 푸박스의 위치를 확인하세요.</div>
        <div>map</div>
      </div>
      <div>내 주변 실종신고</div>
      <div>주변의 실종 반려동물들을 찾아주세요.</div>
      <div className="flex gap-2">
        <div className="flex border w-20 h-20 rounded-xl">card1</div>
        <div className="flex border w-20 h-20 rounded-xl">card2</div>
        <div className="flex border w-20 h-20 rounded-xl">card3</div>
        <div className="flex border w-20 h-20 rounded-xl">card4</div>
      </div>
    </div>
  );
}

export default Maincomponent;
