;(async () => {
  await require('./fetch-firebase-data')()
  await require('./fetch-rating')()
  await require('./fetch-images')()
})()
