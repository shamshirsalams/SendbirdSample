function uploadFile(){
    
let data = null
let compressedFile = ''
let metaData = {}
  compressedFile = await ImageCompressor.compress(asset.uri, {
    compressionMethod: 'auto',
  })
  metaData = await getImageSize(compressedFile)
data = {
  type: asset.type.includes('video') ? 'video' : 'image',
  height: metaData.height,
  width: metaData.width,
  url: compressedFile,
}
const sb = SendBird.getInstance()
const params = new sb.FileMessageParams()
const file = {
  uri: data.url,
  name: asset.fileName,
  type: asset.type,
}
params.file = file
params.thumbnailSizes = [
  { maxWidth: 112, maxHeight: 200 },
  { maxWidth: 140, maxHeight: 140 },
]
params.data = JSON.stringify(data)
const imageData = { ...data, imageData: params }
this.sendMessage(
  asset.type.includes('video')
    ? CUSTOM_TEXT_STRINGS.video
    : CUSTOM_TEXT_STRINGS.picture,
  imageData,
)
}
