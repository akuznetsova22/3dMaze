/**
 * This is an abstract class representing the solver for the problem
 */
class Searchable {
    constructor(search){
        if (this.constructor === Searchable) {
            throw new Error('Abstract class Searchable cannot be instantiated');
          }
        this.search = search;
    }
}

export default Searchable;