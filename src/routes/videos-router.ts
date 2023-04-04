import {Request, Response, Router } from "express";
import {app, HTTP_STATUSES} from '../../src'
import bodyParser from 'body-parser'


export const videosRouter = Router({})

const parserMiddeleware = bodyParser({})
app.use(parserMiddeleware)


let currentDate = new Date()
const day = currentDate.getDate() + 1
const dateInMs = currentDate.setDate(day)
let plusCurrentDate = new Date(dateInMs)

const availableResolutions = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']


type videoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Array<string>
}
type videosType = Array<videoType>
type errorObjType = {message: string, field: string}
type errorType = {errorMessages: Array<errorObjType>}

let arrErrors: Array<errorObjType> = [] 
let allErrors: errorType = {errorMessages: arrErrors}
let videos: videoType[] = [{
    id: 1,
    title: 'video1',
    author: 'autor1',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: currentDate.toISOString(),
    publicationDate: plusCurrentDate.toISOString(),
    availableResolutions:['P2160']
  },{
    id: 2,
    title: 'video2',
    author: 'autor2',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: currentDate.toISOString(),
    publicationDate: plusCurrentDate.toISOString(),
    availableResolutions:[ 'P144']
  }]


const errors = (body: any) => {
    if (typeof body.title !== 'string') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        })
    } else if(body.title.length > 40) {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        })
    }
    if (typeof body.author !== 'string') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        })
    } else if (body.author.length > 20) {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        })
    }
    if (typeof body.canBeDownloaded !== 'undefined') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        })
    }
    if (typeof body.canBeDownloaded !== 'boolean') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        })
    }
    if (!body.availableResolutions.every((p: string) => availableResolutions.includes(p))) {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        })
    }
    if (typeof body.minAgeRestriction !== 'undefined') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        })
    }
    if (typeof body.minAgeRestriction !== 'number') {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        })
    } else if (+body.minAgeRestriction > 18 || +body.minAgeRestriction < 1) {
        arrErrors.push({
            message: 'Incorrect title',
            field: 'title'
        })
    }
}



videosRouter.get('/', (req: Request, res: Response) => { 
    res.status(HTTP_STATUSES.OK_200).send(videos)
    })
    
videosRouter.get('/:id', (req:Request, res: Response) => {
    for(let key of videos) {
      if (key.id === +req.params.id){
        res.status(HTTP_STATUSES.OK_200).send(key);
        return;
      }
    }  
      res.send(HTTP_STATUSES.NOT_FOUND_404) 
    })
    
videosRouter.post('/', (req: Request, res: Response)=> {
    
        let title = req.body.title
        let author = req.body.author
        let currentDate = new Date()
        const day = currentDate.getDate() + 1
        const dateInMs = currentDate.setDate(day)
        let plusCurrentDate = new Date(dateInMs)  

        errors(req.body)
        if(arrErrors.length > 0){
          res.status(HTTP_STATUSES.BAD_REQUEST_400).send(allErrors)
          return;
        } else {
      const newVideo: videoType = {
        id: +(new Date()),
        title: title,
        author: author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: currentDate.toISOString(),
        publicationDate: plusCurrentDate.toISOString(),
        availableResolutions: req.body.allResolutions
      }   
      videos.push(newVideo)
      res.status(HTTP_STATUSES.CREATED_201)
      res.send(newVideo)
    }
    })
    
videosRouter.delete('/:id', (req: Request, res: Response) => {
        if(videos.length > 0) {
            for(let key of videos) {
                if (key.id === +req.params.id){
                    videos.splice(key.id, 1) 
                    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) 
                    return;
                }
            }
        }
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    })
    
videosRouter.put('/:id', (req: Request, res: Response) => {

      let title = req.body.title
      let author = req.body.author
      let currentDate = new Date()
      const day = currentDate.getDate() + 1
      const dateInMs = currentDate.setDate(day)
      let plusCurrentDate = new Date(dateInMs)

      for(let key of videos) {
        if (key.id === +req.params.id){
      errors(req.body)
      if(arrErrors.length > 0){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(allErrors)
        arrErrors.length = 0
        return;
      } else {
        key.title = title ?? key.title
        key.author = author ?? key.author
        key.canBeDownloaded = req.body.canBeDownloaded ?? key.canBeDownloaded
        key.minAgeRestriction = req.body.minAgeRestriction ?? key.minAgeRestriction
        key.createdAt = req.body.createdAt ?? key.createdAt
        key.publicationDate = req.body.publicationDate ?? key.publicationDate
        key.availableResolutions = req.body.availableResolutions ?? key.availableResolutions
      }
    }
  } 
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})


    app.delete('/__test__/data', (req: Request, res: Response) => {
        if(videos.length > 0)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
      })