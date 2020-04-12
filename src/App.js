import React, { Component } from 'react';
import './App.css';

import { ItemService } from './data/services/ItemService';
import List from './views/components/List/List';
import NewItem from './views/components/NewItem/NewItem';
import { Button, Icon, Container, Grid, GridRow, GridColumn } from 'semantic-ui-react';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      list: []
    };

    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.clear = this.clear.bind(this);
  }

  async componentDidMount(){
    const list = await ItemService.list().catch( err => [] ); //Esperar o retorno da lista (com await)
    this.setState({list});
  }

  add(description){
    ItemService.create({
      description: description,
      isChecked: false
    }).then(newItem => {
      const { list } = this.state;
      list.push(newItem);
      this.setState({list}); //Atualizar o estado
    });
  }

  update(newItem){
    const { list } = this.state,
          itemIndex = list.findIndex(item => item.id === newItem.id);
    list[itemIndex] = newItem;
    
    ItemService.update(newItem);
    
    this.setState({list});
  }

  remove(id){
    const { list } = this.state,
          itemIndex = list.findIndex(item => item.id === id);
    list.splice(itemIndex, 1);
    ItemService.remove(id);
    this.setState({list});
  }

  clear(){
    const toDo = [],
          done = [], 
          { list } = this.state;

      list.forEach(item => {
        if(item.isChecked){ // Já está feito
          done.push(item);
        } else { // Não está feito
          toDo.push(item);
        }
      });

      done.forEach(item => this.remove(item.id)); //Removeu todos já feitos
      this.setState({ list: toDo }); //Atualiza somente aqueles que não foram feitos
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
                <NewItem onAdd={this.add} onClear={this.clear} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="row-separate">
              <Grid.Column width={4}>
                <List items={state.list} onRemove={this.remove} onUpdate={this.update} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
  };

}
export default App;
