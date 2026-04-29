export const articlesQuery = `*[_type == "article"] | order(_createdAt desc) {
  "id": _id,
  title,
  excerpt,
  "image": mainImage.asset->url,
  category,
  tier,
  "author": author->name,
  "authorImage": author->image.asset->url,
  "date": _createdAt,
  readTime,
  views,
  likes,
  body // เพิ่มบรรทัดนี้เพื่อดึงเนื้อหา/รูปภาพในบทความออกมา
}`