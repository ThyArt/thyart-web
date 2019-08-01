import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jest_localstorage_mock from "jest-localstorage-mock";

configure({ adapter: new Adapter() });