import {Container} from 'unstated';
import { Provider, Subscribe } from 'unstated';

export default class HomeContext extends Container {
    constructor() {
        this.state = {
            sampleData: {}
        }
    }
}