class Searchable {
    constructor(search){
        if (this.constructor === Searchable) {
            throw new Error('Abstract class Searchable cannot be instantiated');
          }
        this.search = search;
    }
    get startState(){};
    get goalState(){}
    getStateTransitions(state){}

    
}

export default Searchable;