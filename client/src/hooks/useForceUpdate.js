import React, {useState} from "react";

function useForceUpdate() {

    const [renderState, setRenderState] = useState(false);

    const forceUpdate = () => setRenderState( s => !s);

    return forceUpdate

}

export default useForceUpdate;