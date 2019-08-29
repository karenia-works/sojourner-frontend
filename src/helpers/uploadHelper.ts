import Axios from 'axios'
import config from '@/config'

async function uploadImages(
  imgs: File[],
  uploadCallack?: (fileIndex: number, loaded: number, total: number) => void
): Promise<string[]> {
  let imageNames: string[] = []
  let asyncImgUpload = async (img: File, index: number) => {
    let request = await Axios.post(
      config.backend.address + config.backend.imageEndpoint,
      new FormData().append('file', img),
      {
        onUploadProgress: (event: ProgressEvent) => {
          if (uploadCallack) uploadCallack(index, event.loaded, event.total)
        }
      }
    )
    imageNames[index] = request.data as string
  }
  await Promise.all(imgs.map((file, index) => asyncImgUpload(file, index)))
  return imageNames
}

export { uploadImages }
