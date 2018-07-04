import PubSub from 'pubsub-js';

export default class TratadorErros {

    lidarErros(erros) {
        for(var c in erros) {
            PubSub.publish('erro-validacao', erros[c]);
        }
    }
}
