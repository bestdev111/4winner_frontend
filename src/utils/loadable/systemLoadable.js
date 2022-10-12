import Loadable from 'react-loadable';
import Loading from './loading';

/**
 * Loadable defaults
 * For to Avoid Repetition
 */
const SystemLoadable = (opts) => {
    return Loadable(Object.assign({
        loading: Loading,
        delay  : 300,
        timeout: 10000
    }, opts));
};

export default SystemLoadable;