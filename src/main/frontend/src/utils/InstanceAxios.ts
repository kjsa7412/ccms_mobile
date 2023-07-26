import axios from "axios";

let isRunning = false;

export const setAxios = () => {
    // 요청 인터셉터 추가
    axios.interceptors.request.use(
        function (config) {
            // 요청을 보내기 전에 수행할 일
            // ...
            return config;
        },
        function (error) {
            // 오류 요청을 보내기전 수행할 일
            // ...
            return Promise.reject(error);
        }
    );

    // 응답 인터셉터 추가
    axios.interceptors.response.use(
        function (response) {
            // 응답 데이터를 가공 (http status가 200 인 경우)
            // .then() 으로 이어짐
            isRunning = true;
            return response;
        },
        function (error) {
            // 오류 응답을 처리 (http status가 200 아닌 경우)
            // .catch() 으로 이어짐
            console.log("error : " + JSON.stringify(error));
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(
                    "api error : 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
                );
                console.log("error.response.data : " + error.response.data);
                console.log("error.response.status : " + error.response.status);
                console.log("error.response.headers : " + error.response.headers);

                if (error.response.status === 401) {
                    if (isRunning) {
                        isRunning = false;
                        window.location.reload();
                        console.log("window.location.reload()");
                    }
                } else {
                    isRunning = true;
                }
            } else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                // Node.js의 http.ClientRequest 인스턴스입니다.
                isRunning = true;
                console.log("api error : 요청이 이루어 졌으나 응답을 받지 못했습니다.");
                console.log("error.request : " + error.request);
            } else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                isRunning = true;
                console.log(
                    "api error : 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
                );
                console.log("error.message : " + error.message);
            }
            console.log("error.config : " + error.config);
            return Promise.reject(error);
        }
    );
};
