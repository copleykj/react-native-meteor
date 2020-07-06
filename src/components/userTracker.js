import { useEffect, useState } from 'react';
import Trackr from 'trackr';

export default (trackerFn, deps = []) => {
    const [response, setResponse] = useState(trackerFn());
    let computation = null;

    const stopComputation = () => {
        computation && computation.stop();
        computation = null;
    };

    useEffect(() => {
        stopComputation();
        Trackr.autorun(currentComputation => {
            computation = currentComputation;
            setResponse(trackerFn());
        });
        return stopComputation;
    }, deps);

    return response;
};
