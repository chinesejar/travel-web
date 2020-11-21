import React, { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Input, Button } from 'antd';
import AMap from 'AMap';
import AMapUI from 'AMapUI';
import styles from '../index.less';
import { useDispatch, useSelector } from 'umi';

function InfoBox({ data }) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button type="primary" id="btn_add">
        添加
      </Button>
    </div>
  );
}

export default function Map() {
  const [map, setMap] = useState(null);
  const [picker, setPicker] = useState(null);
  const { guide, index } = useSelector(state => state.make);
  const dispatch = useDispatch();

  useEffect(() => {
    let amap = new AMap.Map('map', {
      center: [116.397428, 39.90923],
      zoom: 11,
      layers: [new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()],
    });
    setMap(amap);
  }, []);

  useEffect(() => {
    if (map) {
      AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
        var poiPicker = new PoiPicker({
          input: 'search',
        });
        setPicker(poiPicker);
        poiPickerReady(poiPicker);
      });
    }
  }, [map]);

  function poiPickerReady(poiPicker) {
    var marker = new AMap.Marker();
    poiPicker.on('poiPicked', function({ item }) {
      marker.setMap(map);
      AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
        var infoWindow = new SimpleInfoWindow({
          infoTitle: 'POI信息',
          infoBody: renderToString(<InfoBox data={item} />),
          offset: new AMap.Pixel(0, -20),
        });
        infoWindow.setMap(map);

        marker.setPosition(item.location);
        infoWindow.setPosition(item.location);

        infoWindow.get$InfoBody().on('click', '#btn_add', event => {
          event.stopPropagation();
          dispatch({
            type: 'make/addPoi',
            payload: item,
          });
        });
        infoWindow.open(map, marker.getPosition());

        map.setCenter(marker.getPosition());
      });
    });

    /* poiPicker.onCityReady(function () {
      poiPicker.suggest('美食');
    }); */
  }

  return (
    <>
      <div className={styles.map} id="map" />
      <div
        className={styles.control}
        style={{ display: index === null ? 'none' : 'unset' }}
      >
        <Input id="search" size="large" placeholder="搜索点" />
      </div>
    </>
  );
}
