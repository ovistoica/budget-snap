import * as ImagePicker from 'expo-image-picker'
import {useAsync} from './use-async'

function pickImage() {
  // No permissions request is necessary for launching the image library
  return ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    exif: true,
  })
}

function getDateInfo(dateString: string) {
  const [[year, month, day], [hour, minutes, seconds]] = dateString
    .split(' ')
    .map((x) => x.split(':'))
    .map((x) => x.map((y) => parseInt(y)))
  return {year, month, day, hour, minutes, seconds}
}

function extractDateTime(exif: Record<string, unknown>) {
  const {DateTimeOriginal, DateTimeDigitized} = exif
  if (DateTimeOriginal && typeof DateTimeOriginal === 'string') {
    return getDateInfo(DateTimeOriginal)
  }
  if (DateTimeDigitized && typeof DateTimeDigitized === 'string') {
    return getDateInfo(DateTimeDigitized)
  }
  return null
}

export function useImagePicker() {
  const {run, isSuccess, data, ...asyncData} =
    useAsync<ImagePicker.ImagePickerResult>()

  const createdAt =
    isSuccess && !data?.cancelled
      ? extractDateTime(data?.exif ?? {})
      : undefined

  return {
    run: () => run(pickImage()),
    ...asyncData,
    isSuccess,
    data,
    createdAt,
  }
}
