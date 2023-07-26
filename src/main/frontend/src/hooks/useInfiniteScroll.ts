import {useCallback, useEffect} from "react";
import {throttle} from "lodash";

const useInfiniteScroll = (setPostMax: Function) => {
    const lockScroll = useCallback(() => {
        document.body.style.overflow = "hidden";
    }, []);

    const unlockScroll = useCallback(() => {
        document.body.style.overflow = "";
    }, []);

    const handleScroll = throttle(async () => {
        // 페이지 총 높이
        const scrollHeight = document.documentElement.scrollHeight;
        // 스크롤된 높이
        const scrollTop = document.documentElement.scrollTop;
        // 사용자에게 보여지는 높이
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight + 50 >= scrollHeight) {
            //console.log("[useInfiniteScroll] 스크롤 동작");
            // 스크롤 방지
            lockScroll();
            // 사용자 함수 실행
            setPostMax((prevState: number) => prevState + 20);
            // 스크롤 방지 해제
            await unlockScroll();
        }
    }, 300);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
};

export default useInfiniteScroll;
