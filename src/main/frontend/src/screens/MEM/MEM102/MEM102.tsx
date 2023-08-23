import React, {useEffect, useState} from "react";
import ScreenContainer from "../../../components/containers/ScreenContainer";
import PageTitle from "../../../components/PageTitle";
import HeaderBase from "../../../components/header/HeaderBase";
import {HeaderMenu, HeaderTitle} from "../../../components/header/HeaderItems";
import 'ol/ol.css';
import {Map, View, Overlay} from 'ol';
import {XYZ, Vector as VectorSource} from 'ol/source';
import {Tile, Vector} from 'ol/layer';
import {fromLonLat} from 'ol/proj';
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import {defaults} from 'ol/control';
import {Style, Text, Icon} from 'ol/style';
import {useQuery} from "react-query";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import {selectCCTV} from "./MEM102_API";
import './MEM102.css';
import SearchRS from "../../../components/searchRS/SearchRS";
import {ISearchData} from "@custom-interfaces/search-interface";
import {IResult_SelectMEM102} from "@custom-interfaces/MEM102/mem102.interface";
import useMenuStatus from "../../../hooks/useMenuStatus";
import {EMenuBar} from "@custom-enums/menu-enum";

const MEM102 = () => {
    // data
    const [map, setMap] = useState<any>();
    const [cctv, setCCTV] = useState<ISearchData>();

    // query
    const resultQuery_selectCCTV = useQuery([EQueryKey.MEM102_selectCCTV], () => selectCCTV(), {
        onSuccess: (data) => {
            // marker 추가
            map?.addLayer(new Vector({
                source: new VectorSource({
                    features: createFeatures(data),
                }),
            }));

            // marker 클릭 시 Description
            map?.on('click', (event: any) => {
                map.getOverlays().getArray().slice(0).forEach((overlay: any) => map.removeOverlay(overlay));

                map.forEachFeatureAtPixel(event.pixel, (feature: any) => {
                    const coordinate = feature.getGeometry().getCoordinates()
                    const content = document.createElement('div');
                    content.innerHTML = `
                        <div class="mem102-infoContainer">
                            <div class="mem102-itemContainer"><div class="mem102-title">장비명</div><div class="mem102-contents">${feature.get('area_nm')}</div></div>
                            <div class="mem102-itemContainer"><div class="mem102-title">관리번호</div><div class="mem102-contents">${feature.get('area_id')}</div></div>
                            <div class="mem102-itemContainer"><div class="mem102-title">제조사</div><div class="mem102-contents">${feature.get('manu_comp')}</div></div>
                            <div class="mem102-itemContainer"><div class="mem102-title">설치주소</div><div class="mem102-contents">${feature.get('inst_addr_road')}</div></div>
                        </div>
                    `;
                    const popup = new Overlay({position: coordinate, element: document.createElement('div')});
                    popup.getElement()?.appendChild(content);
                    map.addOverlay(popup);
                    content.querySelector('.mem102-infoContainer')?.addEventListener('click', () => map.removeOverlay(popup));
                });
            });
        }
    });

    // function : 마커생성
    const createFeatures = (data: any) => data?.data?.Content?.map((value: IResult_SelectMEM102) => {
        let marker = new Feature({
            geometry: new Point(fromLonLat([value.logi, value.lati] as any)),
            ...value
        });
        marker.setStyle(new Style({
            text: new Text({text: value.area_nm, font: '13px Noto Sans KR', offsetY: 15, padding: [5, 5, 5, 5]}),
            image: new Icon({anchor: [0.5, 1], src: "img/cctv-40px.png", scale: 0.2})
        }));
        return marker;
    });


    // effect
    useEffect(() => {
        // 선택한 CCTV로 좌표 이동
        if (cctv?.value && map) {
            map.getView().animate({center: fromLonLat([cctv?.value.logi, cctv?.value.lati]), zoom: 18, duration: 1000});
        }
    }, [cctv, map]);

    useEffect(() => {
        // CCTV 초기화
        setMap(new Map({
            controls: defaults({zoom: false, rotate: false}).extend([]),
            layers: [new Tile({
                visible: true,
                source: new XYZ({url: `http://api.vworld.kr/req/wmts/1.0.0/8D896C3D-068B-3D7A-9B26-976F3370AF45/Base/{z}/{y}/{x}.png`,})
            })],
            target: 'map',
            view: new View({center: fromLonLat([129.093197, 35.1962925]), zoom: 16})
        }));
    }, []);

    useMenuStatus(EMenuBar.PARENT_MENU.MEM, EMenuBar.CHILD_MENU.MEM102);

    return (
        <ScreenContainer>
            <PageTitle title={'MEM102'}/>
            <HeaderBase left={[<HeaderMenu/>]} center={[<HeaderTitle title={'GIS기반장비찾기'}/>]} isBackground={false}/>
            <div className="mem102-container-parent">
                <div className="mem102-searchContainer-search">
                    <SearchRS
                        placeholder={'장비명'}
                        option={resultQuery_selectCCTV?.data?.data?.Content?.map(data => ({
                            value: {
                                logi: data.logi,
                                lati: data.lati
                            }, label: data.area_nm
                        })) || []}
                        value={cctv}
                        handleChange={(data: any) => setCCTV(data)}
                        isClearable={true}
                        isLong={true}
                    />
                </div>
            </div>
            <div id='map' style={{width: "100%", height: "100%"}}/>
        </ScreenContainer>
    );
};

export default MEM102;
