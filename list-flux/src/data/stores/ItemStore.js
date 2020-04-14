import Events from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import { ItemService } from '../services/ItemService';
import ItemConstants from '../actions/constants/ItemConstants';

const CHANNEL = new Events.EventEmitter(), //Para emissão e inscrição de eventos
    CHANGE_EVENT = 'change';

let _itemsList = []; //Visibilidade privada

function createItem(description){
    return ItemService.create({
        description: description,
        isChecked: false
    }).then(newItem => {
        _itemsList.push(newItem);
    });
}

function updateItem(newItem){
    const itemIndex = _itemsList.findIndex(item => item.id === newItem.id);
    _itemsList[itemIndex] = newItem;

    return ItemService.update(newItem);
}

function removeItem(id){
    const itemIndex = _itemsList.findIndex(item => item.id === id);
    _itemsList.splice(itemIndex, 1);

    return ItemService.remove(id);
}

function clearAll(){
    const toDo = [], done = [];

    _itemsList.forEach(item => {
    if(item.isChecked){ // Já foi feito
        done.push(item);
    } else { // Não foi feito
        toDo.push(item);
    }
    });

    done.forEach(item => removeItem(item.id)); //Removeu todos já foram feitos
    _itemsList = toDo; //todo -> Os items que não foram feitos
}

const ItemStore = {
    async getAll(){
        if(_itemsList.length === 0)  
            _itemsList = await ItemService.list();
        return _itemsList;
    },
    emitChange(){ //Enviará uma mudança
        CHANNEL.emit(CHANGE_EVENT); //Emitir um evento que foi criado 'CHANGE_EVENT'
    },
    addChangeListener(callback){ //Permitir que inscreva e receba alterações que foram feitas
        CHANNEL.on(CHANGE_EVENT, callback); //Função a ser adicionada 
    },
    removeChangeListener(callback){ //Remover a inscrição
        CHANNEL.removeListener(CHANGE_EVENT,callback); //Função a ser removida
    }
};

//dispatcher - store
//Recebe uma ação que está vindo do dispatcher e vai escolher função que será executada
async function handleAction(action){
    switch(action.actionType){
        case ItemConstants.ITEM_CREATE:
            const description = action.description;
            await createItem(description);
            ItemStore.emitChange(); //Notifica que houve alteração
            break;
        case ItemConstants.ITEM_UPDATE:
            const item = action.item;
            await updateItem(item);
            ItemStore.emitChange();
            break;
        case ItemConstants.ITEM_REMOVE: 
            const id = action.id;
            await removeItem(id);
            ItemStore.emitChange();
            break;
        case ItemConstants.ITEM_CLEAR: 
            clearAll();
            ItemStore.emitChange();
            break;
        default: break;
    }
}

//Registra a store no dispatcher
//Store recebe através desse registro e executa handleAction
ItemStore.dispatchToken = AppDispatcher.register(handleAction); //Retorna o identificador/token para a store

export default ItemStore;