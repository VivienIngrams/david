import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings"][0]{
    name,
    statement,
    bio,
    portraitImage,
    atelierImages,
    contactEmail,
    instagram,
    location,
    expositions
  }`
);

export const ALL_SERIES_QUERY = defineQuery(
  `*[_type == "series"] | order(order asc){
    _id,
    title,
    slug,
    description,
    coverImage,
    order,
    "sculptureCount": count(*[_type == "sculpture" && references(^._id)])
  }`
);

export const SERIES_BY_SLUG_QUERY = defineQuery(
  `*[_type == "series" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    coverImage,
    "sculptures": *[_type == "sculpture" && references(^._id)] | order(order asc){
      _id,
      title,
      slug,
      images,
      year,
      dimensions,
      materials
    }
  }`
);

export const SCULPTURE_BY_SLUG_QUERY = defineQuery(
  `*[_type == "sculpture" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    images,
    year,
    dimensions,
    materials,
    description,
    series->{
      title,
      slug
    }
  }`
);

export const SELECTED_WORKS_QUERY = `
  *[
    _type == "sculpture" &&
    !defined(series) &&
    defined(slug) &&
    defined(slug.current)
  ]
  | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    "coverImage": images[0],
    year
  }
`;

