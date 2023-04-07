"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.HTTP_STATUSES = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const parserMiddeleware = (0, body_parser_1.default)({});
exports.app.use(parserMiddeleware);
let videos = [];
let arrErrors = [];
let allErrors = { errorMessages: arrErrors };
const createdAt = new Date().toISOString();
const publicationDate = new Date(Date.now() + (3600 * 1000 * 48)).toString();
const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
const errors = (body) => {
    if (typeof body.title !== 'string') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
    else if (body.title.length > 40) {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
    if (typeof body.author !== 'string') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
    else if (body.author.length > 20) {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
    if (typeof body.canBeDownloaded !== 'undefined') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
    if (typeof body.canBeDownloaded !== 'boolean') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
    if (!body.availableResolutions.every((p) => availableResolutions.includes(p))) {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
    if (typeof body.minAgeRestriction !== 'undefined') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
    if (typeof body.minAgeRestriction !== 'number') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
    else if (+body.minAgeRestriction > 18 || +body.minAgeRestriction < 1) {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        });
    }
};
exports.app.get('/hometask_01/api/videos', (req, res) => {
    res.status(exports.HTTP_STATUSES.OK_200).send(videos);
});
exports.app.get('/hometask_01/api/videos/:id', (req, res) => {
    for (let key of videos) {
        if (key.id === +req.params.id) {
            res.status(exports.HTTP_STATUSES.OK_200).send(key);
            return;
        }
    }
    res.send(exports.HTTP_STATUSES.NOT_FOUND_404);
});
exports.app.post('/hometask_01/api/videos', (req, res) => {
    errors(req.body);
    if (arrErrors.length > 0) {
        res.status(exports.HTTP_STATUSES.BAD_REQUEST_400).send(allErrors);
        arrErrors.length = 0;
        return;
    }
    else {
        const newVideo = {
            'id': +(new Date()),
            'title': req.body.title,
            'author': req.body.author,
            'canBeDownloaded': req.body.canBeDownloaded,
            'minAgeRestriction': req.body.minAgeRestriction,
            'createdAt': createdAt,
            'publicationDate': publicationDate,
            'availableResolutions': req.body.availableResolutions
        };
        videos.push(newVideo);
        res.status(exports.HTTP_STATUSES.CREATED_201);
        res.send(newVideo);
    }
});
exports.app.delete('/hometask_01/api/videos/:id', (req, res) => {
    if (videos.length > 0) {
        for (let key of videos) {
            if (key.id === +req.params.id) {
                videos.splice(key.id, 1);
                res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
                return;
            }
        }
    }
    res.send(exports.HTTP_STATUSES.NOT_FOUND_404);
});
exports.app.put('/hometask_01/api/videos/:id', (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    for (let key of videos) {
        if (key.id === +req.params.id) {
            errors(req.body);
            if (arrErrors.length > 0) {
                res.status(exports.HTTP_STATUSES.BAD_REQUEST_400).send(allErrors);
                arrErrors.length = 0;
                return;
            }
            else {
                key.title = (_a = req.body.title) !== null && _a !== void 0 ? _a : key.title;
                key.author = (_b = req.body.author) !== null && _b !== void 0 ? _b : key.author;
                key.canBeDownloaded = (_c = req.body.canBeDownloaded) !== null && _c !== void 0 ? _c : key.canBeDownloaded;
                key.minAgeRestriction = (_d = req.body.minAgeRestriction) !== null && _d !== void 0 ? _d : key.minAgeRestriction;
                key.createdAt = (_e = req.body.createdAt) !== null && _e !== void 0 ? _e : key.createdAt;
                key.publicationDate = (_f = req.body.publicationDate) !== null && _f !== void 0 ? _f : key.publicationDate;
                key.availableResolutions = (_g = req.body.availableResolutions) !== null && _g !== void 0 ? _g : key.availableResolutions;
                res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
                return;
            }
        }
    }
    res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
});
exports.app.delete('/ht_01/api/testing/all-data', (req, res) => {
    videos = [];
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
