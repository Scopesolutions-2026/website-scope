import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'hcdiuta4', // รหัสของคุณ
  dataset: 'production',
  apiVersion: '2024-04-29',
  useCdn: false,
})

const builder = createImageUrlBuilder({
  projectId: 'hcdiuta4',
  dataset: 'production',
})

export function urlFor(source: any) {
  return builder.image(source)
}