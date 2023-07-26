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

const MSY101 = () => {
    const [canLogin, setCanLogin] = useState<boolean>(false);
    const [isLoginFail, setIsLoginFail] = useState<boolean>(false);
    const [, setRcUser] = useRecoilState<IUser>(userAtom);
    const [, setRcSignInfo] = useRecoilState<ISignInfo>(signInfoAtom);
    const [, setRcFirst] = useRecoilState<IFirst>(firstAtom);
    const resetUser = useResetRecoilState(userAtom);
    const resetSignInfo = useResetRecoilState(signInfoAtom);
    const [inputData, setInputData] = useState<{ id: string; pw: string }>({id: '', pw: ''});
    const {register, handleSubmit, getValues} = useForm();

    const resultQuery_signIn = useQuery(
        [EQueryKey.MSY101_signIn],
        () => signIn(inputData.id, inputData.pw),
        {
            enabled: false,
            onSuccess: (data) => {
                console.log("resultQuery_signIn : " + JSON.stringify(data));
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

    const onSignIn = async () => {
        const {inputID, inputPW} = getValues();
        setInputData({id: inputID, pw: inputPW});
    };

    const validateInputData = () => {
        const {inputID, inputPW} = getValues();

        if (!!inputID && !!inputPW && !canLogin) {
            setCanLogin(true);
        }

        if ((!inputID || !inputPW) && canLogin) {
            setCanLogin(false);
        }
    };

    useEffect(() => {
        if (!!inputData?.id && !!inputData?.pw) {
            resultQuery_signIn.refetch();
        }
        return () => {
        };
    }, [inputData]);


    return (
        <ScreenContainer isColor={true}>
            <PageTitle title="Login" themeColor={"#E9559C"}/>
            <form className={"msy101-signContainer"} onSubmit={handleSubmit(onSignIn)}>
                <img alt={'logo'} className={"msy101-customImg"} src="img/ccmsLogo.png"/>
                <input className={"msy101-customInput"}
                       type="text"
                       placeholder="Username"
                       {...register('inputID', {
                           onChange: validateInputData,
                       })}
                />
                <input className={"msy101-customInput"}
                       type="password"
                       placeholder="Password"
                       {...register('inputPW', {
                           onChange: validateInputData,
                       })}
                />
                <input className={`msy101-customButton ${canLogin ? "canLogin" : "canNotLogin"}`}
                       type="Submit"
                       value="Sign In"
                       readOnly={true}
                       disabled={!canLogin}
                />
                {isLoginFail && (
                    <>
                        <div className={"msy101-line"}/>
                        <span className={"msy101-notification"}>로그인에 실패했습니다.</span>
                    </>
                )}
            </form>
        </ScreenContainer>
    )
}

export default MSY101;