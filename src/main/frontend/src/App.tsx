import React, {useEffect} from 'react';
import AppContainer from "./components/containers/AppContainer";
import AppRouter from "./components/AppRouter";
import {setAxios} from "./utils/InstanceAxios";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useResetRecoilState} from 'recoil';
import {IFirst, ISignInfo} from "@custom-interfaces/signInfo-interface";
import {firstAtom, signInfoAtom} from "./atoms/signInfoAtom";
import {userAtom} from "./atoms/userAtom";
import {useQuery} from 'react-query';
import {silentSignIn} from "./screens/MSY/MSY101/MSY101_API";
import {EJWT} from "@custom-enums/common-enum";
import MCM101 from "./screens/MCM/MCM101/MCM101";
import {IMenu} from "@custom-interfaces/menu-interface";
import {menuAtom} from "./atoms/menuAtom";
import {registerAccessTokenOfHeader} from "./utils/HandleSign";
import {EQueryKey} from "@custom-enums/queryKey_enum";

function App() {
    setAxios();

    const navigate = useNavigate();
    const [rcSignInfo,] = useRecoilState<ISignInfo>(signInfoAtom);
    const [rcFirst, setRcFirst] = useRecoilState<IFirst>(firstAtom);
    const [rcMenu, setRcMenu] = useRecoilState<IMenu>(menuAtom);
    const resetUser = useResetRecoilState(userAtom);
    const resetSignInfo = useResetRecoilState(signInfoAtom);

    const resultQuery_silentSignIn = useQuery(
        [EQueryKey.MSY101_silentSignIn],
        () => silentSignIn(''),
        {
            enabled: rcSignInfo.isSilentSignIn,
            refetchInterval: EJWT.ExpiryTimeForTest,
            onSuccess: (data) => {
                const rHeaders = data?.headers;
                registerAccessTokenOfHeader(rHeaders["x-auth-token"]);
                setRcFirst({isFirst: false});
            },
            onError: () => {
                resetUser();
                resetSignInfo();
                navigate('/');
            }
        }
    )

    // 창 화면에 맞게 메뉴 위치 조정
    const handleResize = () => {
        if (!rcMenu.isMenuOpened && rcMenu.xPosition !== 0) {
            setRcMenu((prev) => ({
                ...prev,
                immediately: true,
                xPosition: -window.innerWidth - 5,
            }));
        }
    };

    // hook : effect
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        };
    }, []);

    window.history.pushState(null, '', window.location.href);

    return (
        <>
            {rcFirst.isFirst &&
            ((resultQuery_silentSignIn.status !== 'success' &&
                    resultQuery_silentSignIn.status !== 'idle') ||
                resultQuery_silentSignIn.isFetching) ? (
                <div style={{width: "100px", height: "100px", backgroundColor: "red"}}/>
            ) : (
                <AppContainer>
                    <MCM101/>
                    <AppRouter isSignIn={rcSignInfo.isLogin}/>
                </AppContainer>
            )}
        </>
    );
}

export default App;
