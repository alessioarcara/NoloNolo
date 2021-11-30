import {useEffect, useRef, useState} from "react";

const useIntersectionObserver = ({root = null, rootMargin, threshold = 0}) => {
    const [isIntersecting, setIsIntersecting] = useState(false)
    const [node, setNode] = useState(null)

    const observer = useRef(null)

    useEffect(() => {
        observer.current = new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),
            { root, rootMargin, threshold }
        )
        const currentObserver = observer.current
        
        if (node) currentObserver.observe(node);
        return () => currentObserver.disconnect();
        
    }, [node, root, rootMargin, threshold])

    return [setNode, isIntersecting]
}

export default useIntersectionObserver;
