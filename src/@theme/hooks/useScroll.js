import { useEffect, useRef, useState } from 'react';

const useScroll = (parentRef, childRef, callback) => {
    const observer = useRef();
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        if (!isEnd) {
            const childNode = childRef.current;
            const options = {
                root: parentRef.current,
                rootMargin: '0px',
                threshold: 0,
            };

            observer.current = new IntersectionObserver(async ([target]) => {
                if (target.isIntersecting) {
                    const data = await callback();

                    if (data.length === 0) {
                        setIsEnd(true);
                    }
                }
            }, options);

            if (isEnd) {
                observer.current.unobserve(childNode);
            } else {
                observer.current.observe(childNode);
            }

            return () => {
                observer.current.unobserve(childNode);
            };
        }
    }, [isEnd, childRef, parentRef, callback]);

    return isEnd;
};

export default useScroll;
