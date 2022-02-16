import { Router } from 'express';

const router: Router = Router();

router.get('/', (request, response) => {
  response.send('Main')
})

router.get('/stores', (request, response) => {
  response.send('Stores Service')
})

export default router;
