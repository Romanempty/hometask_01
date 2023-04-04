"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const src_1 = require("../../src");
const body_parser_1 = __importDefault(require("body-parser"));
exports.videosRouter = (0, express_1.Router)({});
const parserMiddeleware = (0, body_parser_1.default)({});
src_1.app.use(parserMiddeleware);
let currentDate = new Date();
const day = currentDate.getDate() + 1;
const dateInMs = currentDate.setDate(day);
let plusCurrentDate = new Date(dateInMs);
const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
let arrErrors = [];
let allErrors = { errorMessages: arrErrors };
let videos = [{
        id: 1,
        title: 'video1',
        author: 'autor1',
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: currentDate.toISOString(),
        publicationDate: plusCurrentDate.toISOString(),
        availableResolutions: ['P2160']
    }, {
        id: 2,
        title: 'video2',
        author: 'autor2',
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: currentDate.toISOString(),
        publicationDate: plusCurrentDate.toISOString(),
        availableResolutions: ['P144']
    }];
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
exports.videosRouter.get('/', (req, res) => {
    res.status(src_1.HTTP_STATUSES.OK_200).send(videos);
});
exports.videosRouter.get('/:id', (req, res) => {
    for (let key of videos) {
        if (key.id === +req.params.id) {
            res.status(src_1.HTTP_STATUSES.OK_200).send(key);
            return;
        }
    }
    res.send(src_1.HTTP_STATUSES.NOT_FOUND_404);
});
exports.videosRouter.post('/', (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let currentDate = new Date();
    const day = currentDate.getDate() + 1;
    const dateInMs = currentDate.setDate(day);
    let plusCurrentDate = new Date(dateInMs);
    errors(req.body);
    if (arrErrors.length > 0) {
        res.status(src_1.HTTP_STATUSES.BAD_REQUEST_400).send(allErrors);
        return;
    }
    else {
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: currentDate.toISOString(),
            publicationDate: plusCurrentDate.toISOString(),
            availableResolutions: req.body.allResolutions
        };
        videos.push(newVideo);
        res.status(src_1.HTTP_STATUSES.CREATED_201);
        res.send(newVideo);
    }
});
exports.videosRouter.delete('/:id', (req, res) => {
    if (videos.length > 0) {
        for (let key of videos) {
            if (key.id === +req.params.id) {
                videos.splice(key.id, 1);
                res.sendStatus(src_1.HTTP_STATUSES.NO_CONTENT_204);
                return;
            }
        }
    }
    res.send(src_1.HTTP_STATUSES.NOT_FOUND_404);
});
exports.videosRouter.put('/:id', (req, res) => {
    var _a, _b, _c, _d, _e;
    let title = req.body.title;
    let author = req.body.author;
    let currentDate = new Date();
    const day = currentDate.getDate() + 1;
    const dateInMs = currentDate.setDate(day);
    let plusCurrentDate = new Date(dateInMs);
    for (let key of videos) {
        if (key.id === +req.params.id) {
            errors(req.body);
            if (arrErrors.length > 0) {
                res.status(src_1.HTTP_STATUSES.BAD_REQUEST_400).send(allErrors);
                arrErrors.length = 0;
                return;
            }
            else {
                key.title = title !== null && title !== void 0 ? title : key.title;
                key.author = author !== null && author !== void 0 ? author : key.author;
                key.canBeDownloaded = (_a = req.body.canBeDownloaded) !== null && _a !== void 0 ? _a : key.canBeDownloaded;
                key.minAgeRestriction = (_b = req.body.minAgeRestriction) !== null && _b !== void 0 ? _b : key.minAgeRestriction;
                key.createdAt = (_c = req.body.createdAt) !== null && _c !== void 0 ? _c : key.createdAt;
                key.publicationDate = (_d = req.body.publicationDate) !== null && _d !== void 0 ? _d : key.publicationDate;
                key.availableResolutions = (_e = req.body.availableResolutions) !== null && _e !== void 0 ? _e : key.availableResolutions;
            }
        }
    }
    res.sendStatus(src_1.HTTP_STATUSES.NO_CONTENT_204);
});
src_1.app.delete('/__test__/data', (req, res) => {
    if (videos.length > 0)
        res.sendStatus(src_1.HTTP_STATUSES.NO_CONTENT_204);
});
