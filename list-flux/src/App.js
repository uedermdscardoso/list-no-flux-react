import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import './App.css';

import List from './views/components/List/List';
import NewItem from './views/components/NewItem/NewItem';

import ItemStore from './data/stores/ItemStore';
import ItemActions from './data/actions/ItemActions';

async function getItemState(){ //Retorna todo o objeto atualizado do estado da aplicação
  return {
    list: await ItemStore.getAll()
  };
}

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      list: []
    };

    this._onChange = this._onChange.bind(this);
    this._onChange(); //Já traz todos os dados inicialmente
  }

  async _onChange(){ //Sempre atualiza o estado do componente
    this.setState(await getItemState());
  }

  componentDidMount(){
    //Qual evento que será adicionado
    ItemStore.addChangeListener(this._onChange); //Inscrever-se na Store
  }

  componentWillUnmount(){
    //Qual evento que será removido
    ItemStore.removeChangeListener(this._onChange); //Desinscrever da Store
  }

  render(){
    const { state } = this;

    if(state.list.length == null)
      return(
        <Container fluid={true}>
          <Grid columns={1} centered={true}>
            <Grid.Row>
              <Grid.Column>
                <h2>No items</h2>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );

      return(
        <Container fluid={true}>
          <Grid columns={2} centered={true}>
            <Grid.Row className="grid">
              <Grid.Column width={3}>
                <NewItem onAdd={ItemActions.create} onClear={ItemActions.clear} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="row-separate">
              <Grid.Column width={4}>
                <List items={state.list} onRemove={ItemActions.remove} onUpdate={ItemActions.update} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
  };

}
export default App;
