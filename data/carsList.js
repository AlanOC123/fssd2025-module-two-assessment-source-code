import { Car } from '../classes/Car.js';
import carData from './carData.js';

const carList = carData.getCars().map((core) => new Car(core));

export default carList
