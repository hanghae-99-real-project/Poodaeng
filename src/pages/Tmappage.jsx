/* eslint-disable */

import React, { useEffect } from 'react';
import $ from 'jquery';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../assets/images/Guidearrow.svg';
import { ReactComponent as Clock } from '../assets/images/Clock.svg';

function TmapPage() {
  useEffect(() => {
    initTmap();
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const targetLatitude = query.get('pooLatitude');
  const targetLongitude = query.get('pooLongitude');
  const targetAddress = query.get('address');
  var map;
  var marker_s, marker_e;
  var totalMarkerArr = [];
  var drawInfoArr = [];
  var resultdrawArr = [];

  //navigation주소로 get요청을 보냇을떄 (길찾기 버튼을 눌렀을때) 소켓이 연결되고 네비게이션 실행
  //
  function initTmap() {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = {
        latitude,
        longitude,
      };

      var startY = location.latitude.toString();
      var startX = location.longitude.toString();

      // navigator.geolocation.getCurrentPosition(position => {
      //   const latitude = position.coords.latitude;
      //   const longitude = position.coords.longitude;
      //   const location = {
      //     latitude,
      //     longitude,
      //   };
      //   console.log(location);
      // });

      // const socket = io.connect('http://localhost:3000/navigation', {
      //   path: '/socket.io',
      //   transports: ['websocket'],
      // });

      // function sendmessage(location) {
      //   socket.emit('send location', location);
      // }

      // setInterval(() => {
      //   navigator.geolocation.getCurrentPosition(position => {
      //     const latitude = position.coords.latitude;
      //     const longitude = position.coords.longitude;
      //     const location = {
      //       latitude,
      //       longitude,
      //     };
      //     //위도,경도를 5초 마다 주기적으로 서버로 전송
      //     return location;
      //   });
      // }, 5000);

      // socket.on('receive location', location => {
      //   console.log(location.latitude, location.longitude);

      // var startY = location.latitude.toString();
      // var startX = location.longitude.toString();

      // console.log('>>>>>>>>>>>>', startY, startX);

      if (!map) {
        map = new Tmapv2.Map('map_div', {
          center: new Tmapv2.LatLng(startY, startX),
          width: '100%',
          height: '100vh',
          zoom: 17,
          zoomControl: true,
          scrollwheel: true,
        });
      }

      // if (!marker_s) {
      //   marker_s = new Tmapv2.Marker({
      //     position: new Tmapv2.LatLng(parseFloat(startY), parseFloat(startX)),
      //     icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png',
      //     iconSize: new Tmapv2.Size(24, 38),
      //     map: map,
      //   });
      // } else {
      //   marker_s.setPosition(
      //     new Tmapv2.LatLng(parseFloat(startY), parseFloat(startX)),
      //   );
      // }

      // 3. 경로탐색 API 사용요청
      var headers = {};
      headers['appKey'] = process.env.REACT_APP_TMAP_API_KEY;

      // var startY = "37.3918226"; // 위도
      // var startX = "126.6617672"; // 경도

      // var endY = `${targetLongitude}`;
      // var endX = `${targetLatitude}`;
      var endY = `${targetLatitude}`;
      var endX = `${targetLongitude}`;

      $.ajax({
        method: 'POST',
        headers: headers,
        url: 'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',
        async: false,
        data: {
          startX: startX,
          startY: startY,
          endX: endX,
          endY: endY,
          reqCoordType: 'WGS84GEO',
          resCoordType: 'EPSG3857',
          startName: '출발지',
          endName: '도착지',
        },
        success: function (response) {
          var resultData = response.features;

          // 2. 시작, 도착 심볼찍기
          // 시작
          marker_s = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(parseFloat(startY), parseFloat(startX)),
            icon: 'https://i.ibb.co/9tBNj38/mappoint.png',
            iconSize: new Tmapv2.Size(32, 40),
            map: map,
          });

          // 도착
          marker_e = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(parseFloat(endY), parseFloat(endX)),
            icon: 'https://i.ibb.co/pWTYpzs/End.png',
            iconSize: new Tmapv2.Size(22, 38),
            map: map,
          });
          //결과 출력
          var tDistance =
            '총 거리 : ' +
            (resultData[0].properties.totalDistance / 1000).toFixed(1) +
            'km,';
          var tTime =
            ' 예상 소요 시간 : ' +
            (resultData[0].properties.totalTime / 60).toFixed(0) +
            '분';
          $('#result').text(tTime);

          //기존 그려진 라인 & 마커가 있다면 초기화
          if (resultdrawArr.length > 0) {
            for (var i in resultdrawArr) {
              resultdrawArr[i].setMap(null);
            }
            resultdrawArr = [];
          }

          drawInfoArr = [];

          for (var i in resultData) {
            //for문 [S]
            var geometry = resultData[i].geometry;
            var properties = resultData[i].properties;
            var polyline_;

            if (geometry.type == 'LineString') {
              for (var j in geometry.coordinates) {
                // 경로들의 결과값(구간)들을 포인트 객체로 변환
                var latlng = new Tmapv2.Point(
                  geometry.coordinates[j][0],
                  geometry.coordinates[j][1],
                );
                // 포인트 객체를 받아 좌표값으로 변환
                var convertPoint =
                  new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                // 포인트객체의 정보로 좌표값 변환 객체로 저장
                var convertChange = new Tmapv2.LatLng(
                  convertPoint._lat,
                  convertPoint._lng,
                );
                // 배열에 담기
                drawInfoArr.push(convertChange);
              }
            } else {
              var markerImg = '';
              var pType = '';
              var size;

              // 경로들의 결과값들을 포인트 객체로 변환
              var latlon = new Tmapv2.Point(
                geometry.coordinates[0],
                geometry.coordinates[1],
              );

              // 포인트 객체를 받아 좌표값으로 다시 변환
              var convertPoint =
                new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

              var routeInfoObj = {
                markerImage: markerImg,
                lng: convertPoint._lng,
                lat: convertPoint._lat,
                pointType: pType,
              };
            }
          } //for문 [E]
          drawLine(drawInfoArr);
        },
        error: function (request, status, error) {
          // console.log(
          //   'code:' +
          //     request.status +
          //     '\n' +
          //     'message:' +
          //     request.responseText +
          //     '\n' +
          //     'error:' +
          //     error,
          // );
        },
      });
    });
    // socket.on("receive location", (location) => {
    //   console.log(location.latitude, location.longitude);
    // });
  }

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }

  function drawLine(arrPoint) {
    var polyline_;

    polyline_ = new Tmapv2.Polyline({
      path: arrPoint,
      strokeColor: ' #9932CC ',
      strokeWeight: 6,
      map: map,
    });
    resultdrawArr.push(polyline_);
  }

  return (
    <div className='absolute'>
      <div className='absolute  my-5 top-0 z-30 w-full h-36 flex flex-col justify-center items-center bg-white rounded-lg shadow-xl'>
        <div className='flex'>
          <div className='flex my-1'>
            <Arrow className='mt-1 mr-2' />
            푸박스 위치: <div className='font-bold ml-1'>{targetAddress}</div>
          </div>
        </div>
        <div className='flex justify-start pr-2'>
          <Clock className='mt-1 mr-2' />
          <span id='result' className='pr-32' />
        </div>
        <div className='flex justify-between'>
          <div></div>
          <div
            className='border rounded-lg bg-[#8722ED] text-white px-7 py-2 mt-3'
            onClick={() => navigate('/map')}
          >
            길찾기 종료
          </div>
        </div>
      </div>
      <div id='map_div' className='w-full h-full'>
        <div className='flex justify-evenly items-center w-[375px] h-[65px] shadow-sm'></div>
      </div>
    </div>
  );
}

export default TmapPage;
