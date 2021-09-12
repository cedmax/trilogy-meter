const download = require('image-downloader')
const slugify = require('slugify');
const fs = require('fs');

const cache_folder = process.env.CACHE_FOLDER || './modules/.tmp/'

const formatImage = string =>
  slugify(string.toLowerCase(), { remove: /[$*_+~.()'"!/\-:@]/g });

module.exports = async ({name, poster}) => {
  const imgName = formatImage(name)
  const cacheFile = `${cache_folder}${imgName}.jpg`
  if (!fs.existsSync(cacheFile)) {
    await download.image({
      url: poster,
      dest: cacheFile
    })
  }

  fs.copyFileSync(cacheFile, `./public/images/${imgName}.jpg`)
}