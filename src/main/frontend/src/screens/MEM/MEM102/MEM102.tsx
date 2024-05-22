import React, {useEffect, useState} from "react";
import ScreenContainer from "../../../components/containers/ScreenContainer";
import PageTitle from "../../../components/PageTitle";
import HeaderBase from "../../../components/header/HeaderBase";
import {HeaderMenu, HeaderTitle} from "../../../components/header/HeaderItems";
import 'ol/ol.css';
import {Map, View, Overlay} from 'ol';
import {click} from 'ol/events/condition.js';
import {Select } from 'ol/interaction';
import {XYZ, Vector as VectorSource} from 'ol/source';
import {Tile, Vector} from 'ol/layer';
import {fromLonLat} from 'ol/proj';
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import {defaults} from 'ol/control';
import {Style, Text, Icon, Fill} from 'ol/style';
import {useQuery} from "react-query";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import {selectCCTV} from "./MEM102_API";
import './MEM102.css';
import SearchRS from "../../../components/searchRS/SearchRS";
import {ISearchData} from "@custom-interfaces/search-interface";
import {IResult_SelectMEM102} from "@custom-interfaces/MEM102/mem102.interface";
import useMenuStatus from "../../../hooks/useMenuStatus";
import {EMenuBar} from "@custom-enums/menu-enum";
import Cluster from 'ol/source/Cluster';
import Icons from "../../../components/Icons";
import {EIcon} from "@custom-enums/common-enum";



const MEM102 = () => {
    // data
    const [map, setMap] = useState<any>();
    const [cctv, setCCTV] = useState<ISearchData>();
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [selectedDatailFeature, setSelectedDatailFeature] = useState<any>(null);

    // query
    const resultQuery_selectCCTV = useQuery([EQueryKey.MEM102_selectCCTV], () => selectCCTV(), {
        onSuccess: (data) => {
            // marker 추가
            const clusterSource = new Cluster({
                distance: 100,
                source: new VectorSource({
                    features: createFeatures(data),
                }),
            });

            map?.addLayer(
                new Vector({
                    source: clusterSource,
                    style: (feature) => {
                        const size = feature.get("features").length;
                        const text = feature.get("features")[0].get("area_nm") + (size > 1 ? ' 외 ' + `${size} 건` : '');

                        return new Style({
                            image: new Icon({
                                anchor: [0.5, 1],
                                src: "img/cctv-40px.png",
                                scale: 0.2,
                            }),
                            text: new Text({
                                text: text,
                                font: "bold 13px 'SUITE'",
                                offsetY: 15,
                                padding: [5, 5, 5, 5],
                            }),
                        });
                    },
                })
            );

            // 맵에 클릭 이벤트 추가

            const selectClick = new Select({
                // @ts-ignore
                condition: click,
            });

            map?.addInteraction(selectClick);

            // 클릭 이벤트 등록
            selectClick.on('select', (event: { selected: string | any[]; }) => {
                if (event.selected.length > 0) {
                    const selectedFeature = event.selected[0];

                    updateClusterMarkerStyles();

                    if (selectedFeature) {
                        const clusterStyle = new Style({
                            image: new Icon({
                                anchor: [0.5, 1],
                                src: "img/cctv-40px.png",
                                scale: 0.2,
                            }),
                            text: new Text({
                                text: selectedFeature.get("features")[0].get("area_nm"),
                                font: "bold 15px 'SUITE'",
                                offsetY: 15,
                                padding: [5, 5, 5, 5],
                                fill: new Fill({
                                    color: 'white'
                                }),
                                backgroundFill: new Fill({
                                    color: 'red' // 원하는 배경 색상으로 변경
                                }),
                            }),
                        });

                        selectedFeature.setStyle(clusterStyle);
                    }
                }
            });
        }
    });

    // function : Feature 초기화
    const initFeature = () => {
        setSelectedFeature(null);
        setSelectedDatailFeature(null);
    }

    // function : 마커생성
    const createFeatures = (data: any) =>
        data?.data?.Content?.map((value: IResult_SelectMEM102) => {
            let marker = new Feature({
                geometry: new Point(fromLonLat([value.logi, value.lati] as any)),
                ...value,
            });
            // ...
            return marker;
        });

    // effect
    useEffect(() => {
        // 선택한 CCTV로 좌표 이동
        if (cctv?.value && map) {
            map.getView().animate({
                center: fromLonLat([cctv?.value.logi, cctv?.value.lati]),
                zoom: 18,
                duration: 1000,
            });

            setTimeout(() => {
                const clusterSource = map.getLayers().getArray()[1]?.getSource(); // Assuming the cluster layer is the second layer
                const cctvCoordinate = fromLonLat([cctv?.value.logi, cctv?.value.lati]);
                const closestFeature = clusterSource.getClosestFeatureToCoordinate(cctvCoordinate);

                updateClusterMarkerStyles();
                setSelectedFeature(closestFeature);

                if (closestFeature) {
                    const clusterStyle = new Style({
                        image: new Icon({
                            anchor: [0.5, 1],
                            src: "img/cctv-40px.png",
                            scale: 0.2,
                        }),
                        text: new Text({
                            text: closestFeature.get("features")[0].get("area_nm"),
                            font: "bold 15px 'SUITE'",
                            offsetY: 15,
                            padding: [5, 5, 5, 5],
                            fill: new Fill({
                                color: 'white'
                            }),
                            backgroundFill: new Fill({
                                color: 'red' // 원하는 배경 색상으로 변경
                            }),
                        }),
                    });

                    closestFeature.setStyle(clusterStyle);
                }
            }, 1300);
        }
    }, [cctv, map]);

    useEffect(() => {
        // CCTV 초기화
        setMap(new Map({
            controls: defaults({zoom: false, rotate: false}).extend([]),
            layers: [new Tile({
                visible: true,
                source: new XYZ({url: `https://map.pstatic.net/nrb/styles/basic/{z}/{x}/{y}.png`,})
            })],
            target: 'map',
            view: new View({center: fromLonLat([129.093197, 35.1962925]), zoom: 16})
        }));
    }, []);

    useMenuStatus(EMenuBar.PARENT_MENU.MEM, EMenuBar.CHILD_MENU.MEM102);

    useEffect(() => {
        if (map) {
            map.on('click', (event: { pixel: any; }) => {
                const feature = map.forEachFeatureAtPixel(event.pixel, (f: any) => f);
                if (!!feature) {
                    initFeature();
                    setSelectedFeature(feature);
                }
            });
        }
    }, [map]);

    const updateClusterMarkerStyles = () => {
        const clusterSource = map.getLayers().getArray()[1].getSource(); // Assuming the cluster layer is the second layer
        clusterSource.forEachFeature((feature: any) => {
            const style = new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    src: "img/cctv-40px.png",
                    scale: 0.2,
                }),
                text: new Text({
                    text: feature.get("features")[0].get("area_nm") + (feature.get("features").length > 1 ? ' 외 ' + `${feature.get("features").length} 건` : ''),
                    font: "bold 13px 'SUITE'",
                    offsetY: 15,
                    padding: [5, 5, 5, 5],
                    fill: new Fill({
                        color: 'black'
                    }),
                    backgroundFill: undefined
                }),
            });
            feature.setStyle(style);
        });
    };


    return (
        <ScreenContainer flexEnd={true}>
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
            {selectedFeature && (
                <div className="mem102-popupContainer">
                    <div className="mem102-iconContainer">
                        <div className="icon" onClick={initFeature}>
                            <img alt={"spinner"} src={`${process.env.PUBLIC_URL}/img/close-35px.png`}/>
                        </div>
                    </div>
                    <div className="mem102-contentsContainer">
                            {
                                // @ts-ignore
                                selectedFeature.get('features').map((f, index) => (
                                <div className="contents" key={index} onClick={() => setSelectedDatailFeature(f)}>{f.get('area_nm')}</div>
                            ))}
                    </div>
                    <div className="mem102-bottomContainer"/>
                </div>
            )}
            {
                selectedDatailFeature && (
                <div className="mem102-infoContainer" onClick={() => setSelectedDatailFeature(null)}>
                    <div className="mem102-itemContainer">
                        <div className="mem102-title">장비이름</div>
                        <div className="mem102-contents">{selectedDatailFeature.get('area_nm')}</div>
                    </div>
                    <div className="mem102-itemContainer">
                        <div className="mem102-title">관리번호</div>
                        <div className="mem102-contents">{selectedDatailFeature.get('area_id')}</div>
                    </div>
                    <div className="mem102-itemContainer">
                        <div className="mem102-title">제조회사</div>
                        <div className="mem102-contents">{selectedDatailFeature.get('manu_comp')}</div>
                    </div>
                    <div className="mem102-itemContainer">
                        <div className="mem102-title">설치주소</div>
                        <div className="mem102-contents">{selectedDatailFeature.get('inst_addr_road')}</div>
                    </div>
                </div>
            )}
        </ScreenContainer>
    );
};

export default MEM102;
