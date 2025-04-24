'use client';

import { useEffect, useState } from 'react';

const NaverMap = ({ destinationAddress }: { destinationAddress: string }) => {
  const [destination, setDestination] = useState<any>(null);

  // 고정된 출발지 (예: 강남역)
  const origin = {
    lat: 37.4979,
    lng: 127.0276,
    name: '강남역', // 출발지 이름
  };

  useEffect(() => {
    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(destinationAddress, function (result: any, status: any) {
      if (status !== kakao.maps.services.Status.OK) {
        console.error('주소 검색 실패:', status);
        return;
      }

      const destinationLatLng = {
        lat: result[0].y,
        lng: result[0].x,
        name: destinationAddress, // 목적지 이름
      };

      console.log(result);

      setDestination(destinationLatLng);
    });
  }, [destinationAddress]);

  if (!destination) return <div>Loading...</div>;

  // 네이버 길찾기 URL 생성
  const naverUrl = `http://map.naver.com/index.nhn?slng=${origin.lng}&slat=${origin.lat}&stext=${origin.name}&elng=${destination.lng}&elat=${destination.lat}&etext=${destination.name}&menu=route&pathType=3`;

  return (
    <iframe
      src={naverUrl}
      width="1000"
      height="400"
      frameBorder="0"
      style={{ border: 'none' }}
      title="Naver Directions"
    ></iframe>
  );
};

export default NaverMap;
