global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};

global.scrollTo = jest.fn();
global.addEventListener = jest.fn();

/*
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
*/
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new Adapter() });
