import './index.css';
import { Viewer } from './Viewer';

const viewer = new Viewer(['./assets/image1.jpg', './assets/image2.jpg', './assets/image3.jpg']);
viewer.start();
