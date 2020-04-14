import * as ItemConstants from '../actions/ItemActions';

const ItemReducer = (list = [], action) => {
    switch(action.type){
        case ItemConstants.ITEM_LIST_RESPONSE: //ITEM_LIST
            return action.itemList;
        case ItemConstants.ITEM_CREATE_RESPONSE:
            return [ ...list, action.newItem ];
        case ItemConstants.ITEM_UPDATE:
            return list.map((item) => {
                if(item.id === action.item.id)
                    return action.item; //Novo objeto
                return item; //O mesmo objeto
            });
        case ItemConstants.ITEM_REMOVE: 
            const itemIndex = list.findIndex(item => item.id === action.id);
            return [ ...list.splice(0,itemIndex), ...list.splice(itemIndex + 1) ];
        //case ItemConstants.ITEM_CLEAR: //Atualizando o estado da store com filtro
        //    return list.filter(item => !item.isChecked); //Items não marcados
        default: return list;
    }
}
export default ItemReducer; //Reducer do Item
