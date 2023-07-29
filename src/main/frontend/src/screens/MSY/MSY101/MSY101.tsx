import React, {useEffect, useState} from "react";
import "./MSY101.css"
import ScreenContainer from "../../../components/containers/ScreenContainer";
import {useForm} from "react-hook-form";
import {userAtom} from "../../../atoms/userAtom";
import {firstAtom, signInfoAtom} from "../../../atoms/signInfoAtom";
import {useRecoilState, useResetRecoilState} from "recoil";
import {IUser} from "@custom-interfaces/user-interface";
import {IFirst, ISignInfo} from "@custom-interfaces/signInfo-interface";
import {useQuery} from "react-query";
import {signIn} from "./MSY101_API";
import {registerAccessTokenOfHeader} from "../../../utils/HandleSign";
import PageTitle from "components/PageTitle";
import {EQueryKey} from "@custom-enums/queryKey_enum";
import SignInput from "../../../components/input/SignInput";
import Blank from "../../../components/Blank";
import {EBlank} from "@custom-enums/common-enum";
import {theme1} from "../../../styles/theme";
import {modalAlertAtom} from "../../../atoms/modalAlertAtom";
import {modalMutationAtom} from "../../../atoms/modalMutationAtom";

const MSY101 = () => {
    // data
    const [canLogin, setCanLogin] = useState<boolean>(false);
    const [isLoginFail, setIsLoginFail] = useState<boolean>(false);
    const [, setRcUser] = useRecoilState<IUser>(userAtom);
    const [, setRcSignInfo] = useRecoilState<ISignInfo>(signInfoAtom);
    const [, setRcFirst] = useRecoilState<IFirst>(firstAtom);
    const resetUser = useResetRecoilState(userAtom);
    const resetSignInfo = useResetRecoilState(signInfoAtom);
    const resetModalAlert = useResetRecoilState(modalAlertAtom);
    const restModalMutation = useResetRecoilState(modalMutationAtom);
    const [inputData, setInputData] = useState<{ id: string; pw: string }>({id: '', pw: ''});

    // form
    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: inputData,
    });

    // qqyery
    const resultQuery_signIn = useQuery(
        [EQueryKey.MSY101_signIn],
        () => signIn(inputData.id, inputData.pw),
        {
            enabled: false,
            onSuccess: (data) => {
                const rData = data?.data;
                const rHeaders = data?.headers;

                registerAccessTokenOfHeader(rHeaders["x-auth-token"]);

                setRcSignInfo({
                    isLogin: true,
                    isSilentSignIn: true
                });

                setRcFirst({isFirst: false});

                setRcUser({
                    compCd: !!rData?.compCd ? rData.compCd : '',
                    userId: !!rData?.userId ? rData.userId : '',
                    userNm: !!rData?.userNm ? rData.userNm : '',
                    beloCompNm: !!rData?.beloCompNm ? rData.beloCompNm : '',
                    deptNm: !!rData?.deptNm ? rData.deptNm : '',
                    posiNm: !!rData?.posiNm ? rData.posiNm : '',
                    telNo: !!rData?.telNo ? rData.telNo : '',
                    email: !!rData?.email ? rData.email : '',
                    bigo: !!rData?.bigo ? rData.bigo : ''
                });
            },
            onError: (error) => {
                resetUser();
                resetSignInfo();
                setIsLoginFail(true);
            }
        })

    // function
    const onSignIn = async () => {
        const {id, pw} = methods.getValues();
        setInputData({id: id, pw: pw});
    };

    const validateInputData = () => {
        const {id, pw} = methods.getValues();

        if (!!id && !!pw && !canLogin) {
            setCanLogin(true);
        }

        if ((!id || !pw) && canLogin) {
            setCanLogin(false);
        }
    };

    // effect
    useEffect(() => {
        resetModalAlert();
        restModalMutation();
    }, []);

    useEffect(() => {
        if (!!inputData?.id && !!inputData?.pw) {
            resultQuery_signIn.refetch();
        }
        return () => {
        };
    }, [inputData]);
    
    return (
        <ScreenContainer isColor={true}>
            <PageTitle title="Login" themeColor={theme1.color.mainColor_m1}/>
            <form className={"msy101-signContainer"} onSubmit={methods.handleSubmit(onSignIn)}>
                <img alt={'logo'} className={"msy101-customImg"} src="img/ccmsLogo.png"/>
                <SignInput
                    name={'id'}
                    methods={methods}
                    label={'USERNAME'}
                    placeholder={'아이디'}
                    onChange={validateInputData}
                />
                <SignInput
                    name={'pw'}
                    methods={methods}
                    label={'PASSWORD'}
                    placeholder={'비밀번호'}
                    onChange={validateInputData}
                    type={'password'}
                />
                <Blank type={EBlank.Row}/>
                <input className={`msy101-customButton2 ${canLogin ? "canLogin" : "canNotLogin"}`}
                       type="Submit"
                       value="SIGN IN"
                       readOnly={true}
                       disabled={!canLogin}
                />
                {isLoginFail && (
                    <>
                        <div className={"msy101-line"}/>
                        <span className={"msy101-notification"}>로그인을 실패했습니다.</span>
                    </>
                )}
            </form>
            <div className={"msy101-copyRight"}>copyright(c) 동래 CCTV 통합관제센터. All rights reserved.</div>
        </ScreenContainer>
    )
}

export default MSY101;