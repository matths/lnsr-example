import { createServer } from 'http';
import lnsrExample from './lnsr-example.mjs';

const server = createServer(lnsrExample);
server.listen(8000, '127.0.0.1');
