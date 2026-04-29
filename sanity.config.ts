import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'SCOPE Studio',
  projectId: 'hcdiuta4',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [
      {
        name: 'article',
        title: 'บทความ',
        type: 'document',
        fields: [
          { name: 'title', title: 'หัวข้อบทความ', type: 'string' },
          { name: 'excerpt', title: 'เนื้อหาเกริ่นนำ', type: 'text' },
          { name: 'mainImage', title: 'รูปภาพหน้าปก', type: 'image', options: { hotspot: true } },
          { 
            name: 'category', 
            title: 'หมวดหมู่', 
            type: 'string',
            options: {
              list: [
                { title: 'บัญชี & ภาษี', value: 'accounting' },
                { title: 'วิศวกรรม', value: 'engineering' },
              ]
            }
          },
          {
            name: 'body',
            title: 'เนื้อหาบทความ (รายละเอียด)',
            type: 'array', 
            of: [
              { type: 'block' }, 
              { type: 'image', options: { hotspot: true } }
            ]
          }
        ]
      }
    ],
  },
})