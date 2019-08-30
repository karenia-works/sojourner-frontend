import Axios from 'axios'
import config from '@/config'

async function uploadImages(
  imgs: File[],
  uploadCallack?: (fileIndex: number, loaded: number, total: number) => void
): Promise<string[]> {
  let imageNames: string[] = []
  let asyncImgUpload = async (img: File, index: number) => {
    let form = new FormData()
    form.append('file', img)
    let request = await Axios.post(
      config.backend.address + config.backend.imageEndpoint,
      form,
      {
        onUploadProgress: (event: ProgressEvent) => {
          if (uploadCallack) uploadCallack(index, event.loaded, event.total)
        },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      }
    )
    imageNames[index] = request.data as string
  }
  await Promise.all(imgs.map((file, index) => asyncImgUpload(file, index)))
  return imageNames
}

export { uploadImages }
