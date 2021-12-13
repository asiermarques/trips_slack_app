import CommandController from '../../controllers/CommandController';
import HelloController from '../../controllers/HelloController';

export default new Map<string, CommandController>([['hello', HelloController]]);
