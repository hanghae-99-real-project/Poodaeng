/* eslint-disable */
import React, { useEffect } from 'react';
import $ from 'jquery';

function SimpleMap() {
  useEffect(() => {
    initTmap();
  }, []);

  function initTmap() {
    map = new Tmapv2.Map('map_div', {
      center: new Tmapv2.LatLng(37.5652045, 126.98702028),
      width: '100%',
      height: '400px',
      zoom: 17,
      zoomControl: true,
      scrollwheel: true,
    });

    marker_s = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(37.564991, 126.883937),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png',
      iconSize: new Tmapv2.Size(24, 38),
      map,
    });

    marker_e = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(37.56034796361722, 127.00108653540178),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png',
      iconSize: new Tmapv2.Size(24, 38),
      map,
    });

    const headers = {};
    headers.appKey = 'NsJkoCuLC05rZqZf7Sfqk4hw8ZLfSuzf3GXq6qHi';

    $.ajax({
      method: 'POST',
      headers,
      url: 'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',
      async: false,
      data: {
        startX: '126.883937',
        startY: '37.564991',
        endX: '127.00108653540178',
        endY: '37.56034796361722',
        reqCoordType: 'WGS84GEO',
        resCoordType: 'EPSG3857',
        startName: '출발지',
        endName: '도착지',
      },
      success(response) {
        const resultData = response.features;
        const tDistance = `총 거리 : ${(
          resultData[0].properties.totalDistance / 1000
        ).toFixed(1)}km,`;
        const tTime = ` 총 시간 : ${(
          resultData[0].properties.totalTime / 60
        ).toFixed(0)}분`;

        $('#result').text(tDistance + tTime);

        if (resultdrawArr.length > 0) {
          for (var i in resultdrawArr) {
            resultdrawArr[i].setMap(null);
          }
          resultdrawArr = [];
        }

        drawInfoArr = [];

        for (var i in resultData) {
          const { geometry } = resultData[i];
          const { properties } = resultData[i];
          var polyline_;

          if (geometry.type == 'LineString') {
            for (const j in geometry.coordinates) {
              const latlng = new Tmapv2.Point(
                geometry.coordinates[j][0],
                geometry.coordinates[j][1],
              );
              var convertPoint =
                new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
              const convertChange = new Tmapv2.LatLng(
                convertPoint._lat,
                convertPoint._lng,
              );
              drawInfoArr.push(convertChange);
            }
          } else {
            let markerImg = '';
            let pType = '';
            var size;

            if (properties.pointType == 'S') {
              markerImg =
                'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
              pType = 'S';
              size = new Tmapv2.Size(24, 38);
            } else if (properties.pointType == 'E') {
              markerImg =
                'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
              pType = 'E';
              size = new Tmapv2.Size(24, 38);
            } else {
              markerImg = 'http://topopen.tmap.co.kr/imgs/point.png';
              pType = 'P';
              size = new Tmapv2.Size(8, 8);
            }

            const latlon = new Tmapv2.Point(
              geometry.coordinates[0],
              geometry.coordinates[1],
            );
            var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
              latlon,
            );
            const routeInfoObj = {
              markerImage: markerImg,
              lng: convertPoint._lng,
              lat: convertPoint._lat,
              pointType: pType,
            };

            marker_p = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(routeInfoObj.lat, routeInfoObj.lng),
              icon: routeInfoObj.markerImage,
              iconSize: size,
              map,
            });
          }
        }
        drawLine(drawInfoArr);
      },
      error(request, status, error) {
        console.log(
          `code:${request.status}\n` +
            `message:${request.responseText}\n` +
            `error:${error}`,
        );
      },
    });
  }

  function addComma(num) {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }

  function drawLine(arrPoint) {
    let polyline_;

    polyline_ = new Tmapv2.Polyline({
      path: arrPoint,
      strokeColor: '#DD0000',
      strokeWeight: 6,
      map,
    });
    resultdrawArr.push(polyline_);
  }

  return (
    <div>
      <div id='map_div' style={{ width: '100%', height: '400px' }} />
      <p id='result' />
    </div>
  );
}

export default SimpleMap;
