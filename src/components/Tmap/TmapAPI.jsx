import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getPooBox } from '../../api/poobox';
import myLocationIcon from '../../assets/images/mypoint.png';
import positionsIcon from '../../assets/images/points.png';
import Infowindow from '../Infowindow';

function TmapAPI() {
  const { isLoading, isError, data } = useQuery('poobox', getPooBox);
  const [selectedMarker] = useState(null);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const script = document.createElement('script');
      script.innerHTML = `
        var map;
        var markers = [];
        var lastTitle = '';

        function initTmap() {
          map = new Tmapv2.Map("map_div", {
            center: new Tmapv2.LatLng(37.56520450, 126.98702028),
            width: "100%",
            height: "100%",
            zoom: 17
          });

          var positions = ${JSON.stringify(data.data.getPooAll)};

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              var lon = position.coords.longitude;
              var lat = position.coords.latitude;
              var myPosition = new Tmapv2.LatLng(lat, lon);
              var marker = createMarker(myPosition, "${myLocationIcon}", "내 위치");
              lastTitle = "내 위치";
              map.setCenter(myPosition);
              map.addListener('mousemove', function () {
                marker.setTitle(lastTitle);
              });
            });
          }

          positions.forEach(function (position) {
            var createdAt = position.createdAt;
            var pooPhotoUrl = position.pooPhotoUrl;
            var content = position.content;
            var userId = position.UserId;
            var pooId = position.pooId;
            var lat = position.pooLatitude;
            var lon = position.pooLongitude;
            var title = position.address;
            var lonlat = new Tmapv2.LatLng(lat, lon);
            var marker = createMarker(lonlat, "${positionsIcon}", title);

            marker.addListener('mouseover', function () {
              lastTitle = '';
              marker.setCursor('pointer');
            });

            marker.addListener('mouseout', function () {
              lastTitle = '내 위치';
              marker.setCursor('default');
            });

            //Marker에 클릭이벤트 등록.
            marker.addListener("click", function(evt) {
              document.getElementById("result").innerHTML = '';
            });

            markers.push(marker);
          });
        }

        function createMarker(position, icon, title) {
          return new Tmapv2.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
          });
        }

        initTmap();
      `;

      script.type = 'text/javascript';
      script.async = 'async';
      document.head.appendChild(script);
    }
  }, [isLoading, isError, data]);

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <div id='map_div' className='h-full w-full'>
      {selectedMarker && (
        <Infowindow
          id='result'
          address={selectedMarker.address}
          content={selectedMarker.content}
        />
      )}
    </div>
  );
}

export default TmapAPI;
