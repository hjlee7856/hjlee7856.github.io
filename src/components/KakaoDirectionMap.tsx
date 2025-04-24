'use client';

import { useEffect, useState } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

const KakaoDirectionMap = ({ destinationAddress }: { destinationAddress: string }) => {
  const [origin, setOrigin] = useState({ lat: 37.514500825128536, lng: 127.03165990802783 });
  const [destination, setDestination] = useState<any>(null);

  useEffect(() => {
    const { kakao } = window;

    if (!kakao || !kakao.maps || !kakao.maps.services) {
      console.error('카카오맵 API가 로드되지 않았습니다.');
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(destinationAddress, function (result: any, status: any) {
      if (status !== kakao.maps.services.Status.OK) {
        console.error('주소 검색 실패:', status);
        return;
      }

      const destinationLatLng = new kakao.maps.LatLng(result[0].y, result[0].x);
      setDestination(destinationLatLng);
    });
  }, [destinationAddress]);

  if (!destination) return <div>Loading...</div>;

  return (
    <Map
      center={{ lat: origin.lat, lng: origin.lng }}
      level={5}
      style={{ width: '500px', height: '400px' }}
    >
      <MapMarker position={{ lat: origin.lat, lng: origin.lng }} />
      <MapMarker position={{ lat: destination.getLat(), lng: destination.getLng() }} />
      <Polyline
        path={[
          { lat: origin.lat, lng: origin.lng },
          { lat: destination.getLat(), lng: destination.getLng() },
        ]}
        strokeWeight={4}
        strokeColor="#00A000"
        strokeOpacity={0.7}
      />
    </Map>
  );
};

export default KakaoDirectionMap;
