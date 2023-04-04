import express, {Request, Response} from 'express'
export const app = express()
import bodyParser from 'body-parser'

const port = process.env.PORT || 3000

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

const parserMiddeleware = bodyParser({})
app.use(parserMiddeleware)




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

let videos: videosType = [] 
let arrErrors: Array<errorObjType> = [] 
let allErrors: errorType = {errorMessages: arrErrors}

const createdAt = new Date().toISOString()
const publicationDate = new Date(Date.now() + (3600 * 1000 * 48)).toString()
const availableResolutions = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']

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

app.get('/hometask_01/api/videos', (req: Request, res: Response) => { 
  res.status(HTTP_STATUSES.OK_200).send(videos)
  })
  
app.get('/hometask_01/api/videos/:id', (req:Request, res: Response) => {
  for(let key of videos) {
    if (key.id === +req.params.id){
      res.status(HTTP_STATUSES.OK_200).send(key);
      return;
    }
  }  
    res.send(HTTP_STATUSES.NOT_FOUND_404) 
  })
  
  app.post('/hometask_01/api/videos', (req: Request, res: Response)=> {
      errors(req.body)
      if(arrErrors.length > 0){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(allErrors)
        return;
      } else {
    const newVideo: videoType = {
      'id': +(new Date()),
      'title': req.body.title,
      'author': req.body.author,
      'canBeDownloaded': true,
     'minAgeRestriction': null,
      'createdAt': createdAt,
      'publicationDate': publicationDate,
      'availableResolutions': req.body.allResolutions
    }   
    videos.push(newVideo)
    res.status(HTTP_STATUSES.CREATED_201)
    res.send(newVideo)
  }
  })
  
  app.delete('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
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
  
  app.put('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    for(let key of videos) {
      if (key.id === +req.params.id){
    errors(req.body)
    if(arrErrors.length > 0){
      res.status(HTTP_STATUSES.BAD_REQUEST_400).send(allErrors)
      arrErrors.length = 0
      return;
    } else {
      key.title = req.body.title ?? key.title
      key.author = req.body.author ?? key.author
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


  app.delete('/ht_01/api/testing/all-data', (req: Request, res: Response) => {
      videos = []
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})