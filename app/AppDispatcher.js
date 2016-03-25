import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
    dispatch(action = {}) {
        console.log('Dispathced',action);
        super.dispatch(action);
    }

}

export default new AppDispatcher();