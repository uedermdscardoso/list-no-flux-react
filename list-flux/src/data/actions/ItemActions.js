import AppDispatcher from '../dispatcher/AppDispatcher';
import ItemConstants from './constants/ItemConstants';

/*AppDispatcher.dispatch({}); //Envia dados para a store */ 

const ItemActions = {
    create(description){
        AppDispatcher.dispatch({
            actionType: ItemConstants.ITEM_CREATE, //Qual ação será executado
            description: description
        }); 
    },
    update(item){
        AppDispatcher.dispatch({
            actionType: ItemConstants.ITEM_UPDATE,
            item: item
        });

    },
    remove(id){
        AppDispatcher.dispatch({
            actionType: ItemConstants.ITEM_REMOVE,
            id: id
        });
    },
    clear(){
        AppDispatcher.dispatch({
            actionType: ItemConstants.ITEM_CLEAR
        });
    }
};
export default ItemActions;