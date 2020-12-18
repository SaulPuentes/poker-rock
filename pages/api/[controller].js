import * as userController from '../../controllers/userController';
import * as gameController from '../../controllers/gameController';

const getController = (name) => {
    switch(name) {
        case 'user': return userController;
        case 'game': return gameController;
        default: return null;
    };
};

const GET = async (controller, req, res) => {
    const result = await controller.onRead(req.query);
    const code = result.success? 200 : 404; // OK | Not Found
    const data = result.success? result.data : {};
    return res.status(code).json(data);
};

const POST = async (controller, req, res) => {
    const result = await controller.onCreate(req.body);
    const code = result.success? 201 : 400; // OK | Bad request
    const data = result.success? result.data : {};
    return res.status(code).json(data);
};

const PATCH = async (controller, req, res) => {
    const result = await controller.onUpdate(req.body);
    const code = result.success? 200 : 404; // OK | Not found
    const data = result.success? result.data : {};
    return res.status(code).json(data);
};

const DELETE = async (controller, req, res) => {
    return await controller.onDelete(req.body).then(
        fullfilled => res.status(204).json(fullfilled), // No content
        rejeted => res.status(400).json(rejeted)); // Bad request
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
        case 'GET': return GET(controller, req, res);
        case 'POST': return POST(controller, req, res)
        case 'PATCH': return PATCH(controller, req, res);
        case 'DELETE': return DELETE(controller, req, res);
        default:
            return await res.status(405).json({
                error: 'Method Not Allowed',
                message: 'A request method is not supported for the requested resource.'
            });
    }
}
