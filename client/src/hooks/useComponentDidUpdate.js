import React, { useEffect, useRef } from "react";

function useComponentDidUpdate(func, dep) {
    const didUpdate = useRef(false);

    useEffect( () => {
        if (didUpdate.current) func();
        else didUpdate.current = true
    }, dep)
}

export default useComponentDidUpdate;