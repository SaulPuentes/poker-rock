import * as userController from '../../controllers/userController';
import * as gameController from '../../controllers/gameController';

const getController = (name) => {
    switch(name) {
        case 'user':
            return userController;
        case 'game':
            return gameController;
        default:
            return null;
    }
}

export default async function handler(req, res) {
    // set response type
    res.setHeader('Content-Type', 'application/json');
    // select controller
    const controller = getController(req.query.controller);
    if(controller == null) {
        return await res.status(404).json({
            error: 'Not found',
            message: 'Endpoint not found.'
        });
    }
    // call method
    switch(req.method) {
        case 'GET':
            return await controller.onRead(req.query).then(
                fullfilled => res.status(200).json(fullfilled), // Ok
                rejeted => res.status(404).json(rejeted)); // Not found
        case 'POST':
            return await controller.onCreate(req.body).then(
                fullfilled => res.status(201).json(fullfilled), // Created
                rejeted => res.status(40).json(rejeted)); // Bad request
        case 'PATCH':
            return await controller.onUpdate(req.body).then(
                fullfilled => res.status(200).json(fullfilled), // Ok
                rejeted => res.status(404).json(rejeted)); // Not found
        case 'DELETE':
            return await controller.onDelete(req.body).then(
                fullfilled => res.status(204).json(fullfilled), // No content
                rejeted => res.status(400).json(rejeted)); // Bad request
        default:
            return await res.status(405).json({
                error: 'Method Not Allowed',
                message: 'A request method is not supported for the requested resource.'
            });
    }
}
