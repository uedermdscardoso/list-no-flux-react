import { all, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import * as ItemActions from '../actions/ItemActions';
import { ItemService } from '../services/ItemService'; 

/*export function* hello(){
    console.log("hello");
}*/

/* Listando items */
function* listAll(){ //worker saga - aquele que executa (cuida dos efeitos)
    const itemList = yield ItemService.list(); //yield tem o mesmo efeito que await
    yield put(ItemActions.listResponse(itemList)); //Envia para a store (semelhante ao dispatch)
}
//Listando com redux saga
function* watchListAll(){ // Função watcher saga - fica observando ações que estão sendo disparadas para a store
    yield takeLatest(ItemActions.ITEM_LIST, listAll); //Observando a ação 'ITEM_LIST' e executa a função listAll

    /*
        takeEvent - Pega todas ações disparadas ao mesmo tempo
        takeLatest - Pega somente a última ação disparada
    */
}

/* Criando item */
function *create({description}){ //worker saga
    const newItem = yield ItemService.create({
       description,
        isChecked: false
    });
    yield put(ItemActions.createResponse(newItem));

}
function* watchCreate(){ //  watcher saga
    yield takeEvery(ItemActions.ITEM_CREATE, create); //Pegas todas as ações 'ITEM_CREATE' e executa a função 'create'
}

/* Removendo item */
function* remove({id}){ //worker saga
    yield ItemService.remove(id);
}
function* watchRemove(){ //watcher saga
    yield takeEvery(ItemActions.ITEM_REMOVE, remove); //Observando a action 'ITEM_REMOVE'
}

/* Limpando os items */
function* clear(){ //worker saga
    const state = yield select(), //Retorna o estado atual da store / aplicação
          itemList = state.ItemReducer,
          newItemList = itemList.filter(item => !item.isChecked); //Items que não estão marcados

    itemList.forEach(item => {
        if(item.isChecked)
            ItemService.remove(item.id); //Remove items que foram marcados
    });

    yield put(ItemActions.listResponse(newItemList)); //Enviando nova lista 
}
function* watchClear(){ //watcher saga
    yield takeLatest(ItemActions.ITEM_CLEAR, clear);
}


/* Atualizando os items */
function* update({item}){ //worker saga
    yield ItemService.update(item);
}
function* watchUpdate(){ //watcher saga
    yield takeEvery(ItemActions.ITEM_UPDATE, update);
}

export default function* ItemSaga(){ //Retornará todas as sagas utilizadas
    //Usa-se all para que todas as sagas sejam executadas paralelamente
    yield all([ 
        watchListAll(),
        watchCreate(),
        watchRemove(),
        watchClear(),
        watchUpdate()
    ])
}

/*
    --> Explicação
        function* - generator

        return - encerra a função
        yield - aguarda a finalização de uma operação assincrona para continuar a execução do código

        ex.:
            yield 5 
            yield 3

    --> Outras funções
        fork()  - Exclui paralelamente sem bloquear o restante do código
            yield fork(ItemService.remove, '123')
            yield fork(ItemService.remove, '456')
        
        delay() - faz uma pausa
               yield fork(ItemService.remove, '123');
               yield delay(2000);
        
        race() - recebe várias operações e retorna a primeira a ser finalizada
            const {items, timeout} = yield race({
                items: call(ItemService.list'),
                timeout: delay(1000)
            })
            if (items){
                yield put({type: 'ITEM_LIST_RESPONSE', items})
            }else{
                yield put({type: 'TIMEOUT_ERROR'})
            }
        take('*) - observará todas as actions que forem disparadas/executadas

*/