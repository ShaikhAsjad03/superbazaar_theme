const Base_url =process.env.NEXT_PUBLIC_CDN_URL 
export const ImageUrl=(url)=>{
   return `${Base_url}${url}`;
}