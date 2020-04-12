const url = 'http://localhost:8080/items';
export const ItemService = {
    list(){
        return fetch(`${url}`)
            .then(response => response.json())
    },
    create(data){
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return fetch(`${url}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }).then(response => response.json());
    },
    update(data){
        return fetch(`${url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json());
    },
    remove(id){
        return fetch(`${url}/${id}`,{
            method: 'DELETE'
        });
    }
}

